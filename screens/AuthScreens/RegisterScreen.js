import React, {useCallback, useRef, useState} from "react";
import {KeyboardAvoidingView, StyleSheet, Text, View} from "react-native";
import tw from 'tailwind-react-native-classnames'
import { Button, Input, Image } from "react-native-elements";
import Form from "../../components/Form";
import {SCREEN_LOGIN} from "../../constants/ScreensNames";
import { URL_REGISTER} from "../../constants/ApiUrl";
import { useRecoilValue} from "recoil";
import api from "../../api";

const fields = [
    {
        id: "name",
        component: Input,
        autoFocus: true,
        placeholder: "Имя"
    },
    {
        id: "login",
        component: Input,
        placeholder: "логин",
    },
    {
        id: "password",
        component: Input,
        secureTextEntry: true,
        placeholder: "Пароль",
        type: "password"
    },
    {
        id: "about",
        component: Input,
        secureTextEntry: true,
        placeholder: "О себе",
        multiline: true,
        numberOfLines: 4,
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
]

export default ({ navigation }) => {
    const fetch = useRecoilValue(api)
    const [formState, setFormState] = useState({})
    const formStateRef = useRef(formState)
    formStateRef.current = formState

    const goToLogin = useCallback(
        () => {
            navigation.navigate(SCREEN_LOGIN)
        },
        [],
    );

    const register = useCallback(async () => {
        try {
            await fetch(URL_REGISTER, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formStateRef.current)
            })
        } catch (e) {
            console.log(e)
        }

    }, [])

    return (
        <KeyboardAvoidingView style={tw`items-center justify-center p-10 bg-white`}>
            <Text style={tw`mb-8 text-xl font-bold`}>Создание аккаунта</Text>
            <Form
                style={styles.form}
                fields={fields}
                value={formState}
                onChange={setFormState}
            />
            <Button containerStyle={styles.button} title="Регистрация" onPress={register} />
            <Button containerStyle={styles.button} type="outline" title="Логин" onPress={goToLogin} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        marginBottom: 4
    },
    form: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
})

