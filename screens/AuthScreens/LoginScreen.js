import React, {useState, useCallback, useRef} from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from 'tailwind-react-native-classnames'
import { Button, Input, Image } from "react-native-elements";
import Form from "../../components/Form";
import {SCREEN_REGISTER} from "../../constants/ScreensNames";
import {useRecoilState, useRecoilValue} from "recoil";
import api from "../../api";
import {URL_LOGIN} from "../../constants/ApiUrl";
import tokenState from "../../store/token";
import * as SecureStore from "expo-secure-store";

const fields = [
    {
        id: "login",
        component: Input,
        autoFocus: true,
        placeholder: "Логин"
    },
    {
        id: "password",
        component: Input,
        secureTextEntry: true,
        placeholder: "Пароль",
        type: "password"
    },
]

export default ({ navigation }) => {
    const { 1: setToken } = useRecoilState(tokenState)

    const fetch = useRecoilValue(api)
    const [formState, setFormState] = useState({})
    const formStateRef = useRef(formState)
    formStateRef.current = formState

    const goToRegister = useCallback(
        () => {
            navigation.navigate(SCREEN_REGISTER)
        },
        [],
    );

    const login = useCallback(async () => {
        try {
            const data = await fetch(URL_LOGIN, {
                method: 'POST',
                body: JSON.stringify(formStateRef.current)
            })
            const { token } = await data.json()
            await SecureStore.setItemAsync("token", token)
            setToken({ token, setToken })
        } catch (e) {
            console.log(e)
        }

    }, [])
    
    return (
        <View style={tw`items-center justify-center p-10 bg-white`}>
            <Image source={require('../../Public/AA.png')} style={styles.logo} />
            <Form
                style={styles.form}
                fields={fields}
                value={formState}
                onChange={setFormState}
            />
            <Button containerStyle={styles.button} title="Логин" onPress={login} />
            <Button containerStyle={styles.button} type="outline" title="Регистрация" onPress={goToRegister} />
        </View>
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

