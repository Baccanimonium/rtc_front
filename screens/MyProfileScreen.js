import React, {useCallback, useEffect, useState } from "react";
import {TouchableOpacity, Text, View} from "react-native";
import tw from 'tailwind-react-native-classnames'
import UploadImage from "../components/ImagesUploader";
import {useRecoilState, useRecoilValue} from "recoil";
import api from "../api";
import { URL_USER } from "../constants/ApiUrl";
import { Input, Icon } from "react-native-elements";
import Form from "../components/Form";
import CurrentUserState from "../store/user";
import usePreSaveFile from "../hooks/usePreSaveFile";

const preSaveAvatar = usePreSaveFile("avatar")
const fields = [
    {
        id: "avatar",
        component: UploadImage,
        style: tw`mx-auto mb-12`
    },
    {
        id: "name",
        component: Input,
        placeholder: "Имя"
    },
    {
        id: "surname",
        component: Input,
        placeholder: "Фамилия"
    },
    {
        id: "password",
        component: Input,
        secureTextEntry: true,
        placeholder: "Пароль",
        type: "password"
    },
    {
        id: "address",
        component: Input,
        placeholder: "Адресс",
    },
    {
        id: "phone",
        component: Input,
        placeholder: "Телефон",
        type: "phone"
    },
    {
        id: "about",
        component: Input,
        secureTextEntry: true,
        placeholder: "О себе",
        multiline: true,
        numberOfLines: 4,
    },
]

export default ({navigation}) => {
    const [value, setValue] = useState({});
    const fetch = useRecoilValue(api)
    const [userData, setUserData] = useRecoilState(CurrentUserState)


    const saveUserObj = useCallback(async (newUserData) => {
        const data = await fetch(`${URL_USER}/${newUserData.id}`, {
            method: "PUT",
            body: JSON.stringify(newUserData)
        })
        const savedJson = await data.json()

        setUserData(savedJson)
    }, [])

    const withFileSaver = preSaveAvatar(saveUserObj)

    const documentUpdater = useCallback(() => {
        withFileSaver(value)
    }, [value, withFileSaver])

    // copy userData for edit
    useEffect(() => {
        setValue(userData)
    }, [userData])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: ({children}) => {
                return (
                    <View style={tw`flex-row items-center justify-between w-11/12 `}>
                        <Text style={tw`text-white text-xl`}>{children}</Text>
                        <TouchableOpacity onPress={documentUpdater}>
                            <Icon
                                name="check"
                                type="antdesign"
                                size={28}
                                color="white"
                                style={tw`mr-6`}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    }, []);

    return (
        <Form style={tw`mt-6`} fields={fields} value={value}/>
    )
}

