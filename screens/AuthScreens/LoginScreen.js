import React, {useState, useCallback, useRef} from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from 'tailwind-react-native-classnames'
import { Button, Input, Image } from "react-native-elements";
import Form from "../../components/Form";
import {SCREEN_REGISTER} from "../../constants/ScreensNames";
import {useRecoilState, useRecoilValue} from "recoil";
import api from "../../api";
import {URL_LOGIN} from "../../constants/ApiUrl";
import {tokenAtom} from "../../store/user";
import {ErrorInput} from "../../components/ErrorInput"

const LOGIN_LENGTH = 6
const PASSWORD_LENGTH = 6

const fields = (touched) => [
    {
        id: "login",
        component: (props) => ErrorInput(touched, props),
        autoFocus: true,
        validLength: LOGIN_LENGTH,
        placeholder: "Логин",
        messageError: "Обязательно для заполнения"
    },
    {
        id: "password",
        component: (props) => ErrorInput(touched, props),
        secureTextEntry: true,
        validLength: PASSWORD_LENGTH,
        placeholder: "Пароль",
        type: "password",
        messageError: "Обязательно для заполнения"
    },
]

export default ({ navigation }) => {
    const { 1: setToken } = useRecoilState(tokenAtom)

    const fetch = useRecoilValue(api)
    const [formState, setFormState] = useState({})
    const [touched, setTouched] = useState(false)
    const formStateRef = useRef(formState)
    formStateRef.current = formState

    const goToRegister = useCallback(
        () => {
            navigation.navigate(SCREEN_REGISTER)
        },
        [],
    );

    const userLogin = useCallback(async () => {
        try {
            const data = await fetch(URL_LOGIN, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formStateRef.current)
            })
            const { token } = await data.json()
            setToken(token)
        } catch (e) {
            console.log(e)
        }

    }, [])

    const loginButton = () => {
        const { login = "", password = "" } = formState
        setTouched(true)
        if (login.length >= LOGIN_LENGTH && password.length >= PASSWORD_LENGTH) {
            return userLogin()
        }
    }

    return (
        <View style={tw`items-center justify-center p-10 bg-white`}>
            <Image source={require('../../Public/AA.png')} style={styles.logo} />
            <Form
                style={styles.form}
                fields={fields(touched)}
                value={formState}
                onChange={setFormState}
            />
            <Button containerStyle={styles.button} title="Логин" onPress={loginButton} />
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
    },
    errorText: {
        color: "red",
        marginTop: -20,
        marginLeft: 10
    }
})

