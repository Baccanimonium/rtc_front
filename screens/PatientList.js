import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import React from "react";
import { patientList } from "../mock/patient";
import { Badge } from "react-native-elements";

export default () => {
    return (
        <View style={tw`bg-white h-full px-4 pt-6 `}>
            {patientList.map(({id, description, recovered, name}) => (
                <View
                    key={id}
                    style={tw`mb-4 bg-gray-100 p-2 rounded-xl`}
                >
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text>
                            {name}
                        </Text>
                        {recovered && <Badge status="success" badgeStyle={tw`p-2 rounded-full`} /> }
                    </View>
                    <Text>{description}</Text>
                </View>
            ))}
        </View>
    )
}