import {Text, View, Button} from "react-native";
import tw from "tailwind-react-native-classnames";
import React, {useCallback, useEffect, useState} from "react";
import {Badge} from "react-native-elements";
import {URL_PATIENT, URL_USERS} from "../constants/ApiUrl";
import {useRecoilValue} from "recoil";
import api from "../api";
import UserProfile from "../components/UserProfile";

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
    }, [])

    return (
        <View style={tw`bg-white h-full px-4 pt-6 `}>
            {patients.map(({user: {name, avatar}, patient: {id, description, recovered}}) => (
                <View
                    key={id}
                    style={tw`mb-4 bg-gray-100 p-2 rounded-xl w-max`}
                >
                    <View style={tw`flex-row items-center justify-between flex-wrap`}>
                        <UserProfile avatar={avatar} name={name} size="medium" >
                            <Text>{description}</Text>
                        </UserProfile>
                        {recovered && <Badge status="success" badgeStyle={tw`p-2 rounded-full`}/>}
                    </View>

                </View>
            ))}
        </View>
    )
}
