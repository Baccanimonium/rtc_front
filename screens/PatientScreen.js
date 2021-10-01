import React, { useState, useEffect, useCallback, useRef } from "react";
import {Button, Modal, Pressable, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import tw from 'tailwind-react-native-classnames'
import {useRecoilValue} from "recoil";
import api from "../api";
import {URL_PATIENT, URL_SCHEDULE} from "../constants/ApiUrl";
import CalendarStrip from 'react-native-calendar-strip'
import Form from "../components/Form";
import {Input} from "react-native-elements";


const fields = [
    {
        id: "title",
        component: Input,
        autoFocus: true,
        placeholder: "Название курса"
    },
    {
        id: "description",
        component: Input,
        placeholder: "Описание",
        secureTextEntry: true,
        multiline: true,
        numberOfLines: 4,
    }
]

export default ({navigation, route: { params: { id = 1 } = {} } }) => {
    const [patientState, setPatientState] = useState({})
    const [scheduleList, setScheduleList] = useState([])

    const [newScheduleState, setNewScheduleState] = useState({})
    const [modalVisible, setModalVisible] = useState(false)

    const RefNewScheduleState =  useRef(newScheduleState)
    RefNewScheduleState.current = newScheduleState

    const fetch = useRecoilValue(api)

    useEffect(() => {
        (async () => {
            try {
                const rawData = await fetch(`${URL_PATIENT}${id}`, { method: "GET" })
                setPatientState(await rawData.json())
            } catch (e) {
                console.log(e)
            }
        })()
    }, [id])

    useEffect(() => {
        (async () => {
            try {
                const rawData = await fetch(`${URL_SCHEDULE}?user_id=${id}`, { method: "GET" })

                setScheduleList(await rawData.json())
            } catch (e) {
                console.log(e)
            }
        })()
    }, [id])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: ({children}) => {
                const { user:{name}= {}} = patientState
                return (
                    <View style={tw`flex-row items-center justify-between w-11/12 `}>
                        <Text style={tw`text-white text-xl`}>{name}</Text>
                    </View>
                )
            }
        })
    }, [patientState]);



    const selectDate = useCallback((data) => {
        console.log(data)
    } ,[])


    const createSchedule = useCallback(async () => {
        try {
            const rawData = await fetch(URL_SCHEDULE, {
                method: "POST",
                body: JSON.stringify(RefNewScheduleState.current)
            })
            const newSchedule = await rawData.json()
            setScheduleList((schedules) => [...schedules, newSchedule])
            setNewScheduleState({})
            closeModal()
        } catch (e) {
            console.log(e)
        }
    }, [id])


    const openAddScheduleModal = useCallback(() => {
        setModalVisible(true)
        setNewScheduleState({id_user: id})
    }, [id])

    const closeModal = useCallback(() => {
        setModalVisible(false)
    }, [])

    return (
        <View style={tw`bg-white h-full`}>
            <CalendarStrip
                style={{height:150, paddingTop: 20, paddingBottom: 10}}
                onDateSelected={selectDate}
            />
            <View>
                {scheduleList.map(({ title, id, description }) => (
                    <TouchableOpacity key={id}>
                        <Text>{title}</Text>
                        <Text>{description}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    onPress={openAddScheduleModal}
                >
                    <Text>Добавить курс</Text>

                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Button title="x" onPress={closeModal} style={styles.buttonClose}/>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Добавление пациента</Text>
                            <Form
                                style={styles.form}
                                fields={fields}
                                value={newScheduleState}
                                onChange={setNewScheduleState}
                            />
                            <Button style={styles.button} title="Добавить" onPress={createSchedule}/>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        width: 300
    },
})

