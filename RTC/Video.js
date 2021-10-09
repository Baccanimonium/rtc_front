import React from "react";

import {StyleSheet, View} from "react-native";
import {MediaStream, RTCView} from 'react-native-webrtc'
import Button from "./Button";
import tw from "tailwind-react-native-classnames";

const ButtonContainer = ({hangup}) => (
    <View>
        <Button
            iconName="check"
            backgroundColor="red"
            onPress={hangup}
        />
    </View>
)

export default function Video({localStream, remoteStream}) {

    if (localStream && !remoteStream) {
        return <View style={styles.container}>
            <RTCView
                streamURL={localStream.toURL()}
                objectFit="cover"
                style={tw`absolute w-full h-full`}
            />
            <ButtonContainer style={styles.bContainer}/>
        </View>
    }

    if (localStream && remoteStream) {
        return <View style={styles.container}>
            <RTCView
                streamURL={remoteStream.toURL()}
                objectFit="cover"
                style={tw`absolute w-full h-full`}
            />
            <RTCView
                streamURL={localStream.toURL()}
                objectFit="cover"
                style={tw`absolute w-40 h-60 top-0 left-4`}
            />
            <ButtonContainer style={styles.bContainer}/>
        </View>
    }

    return (
        <ButtonContainer style={styles.bContainer}/>
    )
}

const styles = StyleSheet.create({
    bContainer: {
        flexDirection: "row",
        bottom: 30
    },
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    }
})