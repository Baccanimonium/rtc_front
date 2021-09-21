import { Text, View, Button } from "react-native";
import tw from "tailwind-react-native-classnames";
import React, {useCallback} from "react";
import { patientList } from "../mock/patient";
import { Badge } from "react-native-elements";
import {URL_PATIENT} from "../constants/ApiUrl";

export default () => {
    const getPatientList = useCallback(async () => {
        try {
            const data = await fetch(URL_PATIENT, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            console.log(data, 4545)
        } catch (e) {
            console.log(e)
        }

    }, [])
    return (
        <View style={tw`bg-white h-full px-4 pt-6 `}>
            <Button onPress={getPatientList} title="sss"/>
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
