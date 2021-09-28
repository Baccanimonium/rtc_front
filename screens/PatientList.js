import { Text, View, Button } from "react-native";
import tw from "tailwind-react-native-classnames";
import React, {useCallback, useEffect, useState} from "react";
import { patientList } from "../mock/patient";
import { Badge } from "react-native-elements";
import {URL_PATIENT, URL_USERS} from "../constants/ApiUrl";
import {useRecoilValue} from "recoil";
import api from "../api";

export default () => {
    const [patients, setPatients] = useState([])
    const fetch = useRecoilValue(api)

    useEffect(() => {
        (async () => {
            try {
                const data = await fetch(URL_PATIENT, {
                    method: 'GET'
                })
                setPatients(await data.json())
            } catch (e) {
                console.log(e)
            }

        })()
    },[])
    console.log(patients)
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
