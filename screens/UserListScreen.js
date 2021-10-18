import React, {useCallback, useRef, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import tw from 'tailwind-react-native-classnames'
import {URL_PATIENT, URL_USERS} from "../constants/ApiUrl";
import {useRecoilValue} from "recoil";
import api from "../api";
import {useEffect} from "react"
import Form from "../components/Form";
import {Input, Button} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import {SCREEN_PATIENT} from "../constants/ScreensNames";
import ModalWindow  from "../components/ModalWindow"

const fields = [
    {
        id: "description",
        component: Input,
        autoFocus: true,
        placeholder: "Описание"
    }
]

const user2 = [
    {
        id: 1,
        about: "aaa",
        name: "aaa",
    },
    {
        id: 2,
        about: "aaa",
        name: "aaa",
    },
    {
        id: 3,
        about: "aaa",
        name: "aaa",
    },
    {
        id: 4,
        about: "aaa",
        name: "aaa",
    },
]

const dialogAdd = {
    title: "Добавление пациента",
    submitLabel: "Добавить"
}

const dialogAlert = {
    title: "Пациент добавлен",
    submitLabel: "Перейти на страницу пациента"
}


export default () => {
    // todo вернуть загрузку данных
    const [users, setUsers] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [newPatientState, setPatientState] = useState({})
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)
    const [disabledClose, setDisabledClose] = useState(false)
    const navigation = useNavigation()

    const fetch = useRecoilValue(api)
    const formStateRef = useRef(newPatientState)
    formStateRef.current = newPatientState

    useEffect(() => {
        (async () => {
            try {
                const data = await fetch(URL_USERS, {
                    method: 'GET'
                })
                setUsers(await data.json())
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    const addPatient = useCallback((id) => () => {
        setModalVisible(true)
        setPatientState({id_user: id})
    }, [])

    const closeModal = useCallback(() => {
        setModalVisible(false)
    }, [])

    const closeAlert = useCallback(() => {
        setAlertVisible(false)
    }, [])

    const add = useCallback(async () => {
        try {
            setLoadingAdd(true)
            // todo доработать таймер или убрать, вызывая функцию после ответа от бэка
            setDisabledClose(true)
            setTimeout(showAlert, 3000)

            // todo сделать прелоадеры
            const data = await fetch(URL_PATIENT, {
                method: 'POST',
                body: JSON.stringify(formStateRef.current)
            })
            // получаем айди для перехода на страницу пациента
            const {id} = await data.json()
        } catch (e) {
            console.log(e)
        }
        closeModal()
    }, [])

    const showAlert = useCallback(async () => {
        try {
            setLoadingAdd(false)
            setDisabledClose(false)
            closeModal()
            setAlertVisible(true)
        } catch (e) {

        }
    }, [] )

    const transitionToPatient = useCallback( () => {
        // todo проверить переход на страницу пациента
        // navigation.navigate(SCREEN_PATIENT, {id})
    }, [])

    return (
        <View style={tw`bg-white h-full`}>
            <Text>UserListScreen2</Text>
            {user2.map(({id, login, address, name, password, about, phone}) => (
                <View
                    key={id}
                    style={tw`mb-4 bg-gray-100 p-2 rounded-xl`}
                >
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text>
                            {name}
                        </Text>
                    </View>
                    <Text>{about}</Text>
                    <Button onPress={addPatient(id)} title="добавить"/>
                </View>
            ))}
            <ModalWindow
              dialogueParams={dialogAdd}
              modalVisible={modalVisible}
              onClose={closeModal}
              onSubmit={add}
              loading={loadingAdd}
              disabledClose={disabledClose}
            >
                <Form
                  style={styles.form}
                  fields={fields}
                  value={newPatientState}
                  onChange={setPatientState}
                />
            </ModalWindow>
            <ModalWindow
              dialogueParams={dialogAlert}
              modalVisible={alertVisible}
              onClose={closeAlert}
              onSubmit={transitionToPatient}
            />
        </View>
    )
}


// спинер на кнопке
// после 3 секунд закрывать модалку и открывать алерт
// в алерте Пациент 1 добавлен и кнопка Ок
// при нажатии на кнопку переход на страницу пациента

const styles = StyleSheet.create({
    button: {
        padding: 10,
        elevation: 2
    },
    form: {
        width: 300
    },
})
