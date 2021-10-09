import React from 'react'
import {View, StyleSheet} from "react-native";
import Button from "./Button";
import tw from "tailwind-react-native-classnames";

export default function GettingCall ({ join, hangup }) {

    return (
        <View style={styles.container}>
            <View style={styles.image}/>
            <View style={styles.bContainer}>
                <Button
                    iconName="check"
                    backgroundColor="green"
                    onPress={join}
                    style={tw`mr-8`}
                />
                <Button
                    iconName="check"
                    backgroundColor="red"
                    onPress={hangup}
                    style={tw`ml-8`}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    image: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#333333"
    },
    bContainer: {
        flexDirection: "row",
        bottom: 30
    }
})