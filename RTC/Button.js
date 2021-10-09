import React from 'react'
import {TouchableOpacity, View, StyleSheet, LogBox} from "react-native";
import {Icon} from "react-native-elements";
import tw from "tailwind-react-native-classnames";
LogBox.ignoreLogs(["timer"])

export default function Button({
       onPress, iconName, backgroundColor, style
   }) {
    return (
        <View style={tw`m-auto`}>
            <TouchableOpacity
                onPress={onPress}
                style={[
                    { backgroundColor },
                    style,
                    styles.button
                ]}
            >
                <Icon
                    name={iconName}
                    color="white"
                    size={20}
                    type="antdesign"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        padding: 10,
        elevation: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
    }
})