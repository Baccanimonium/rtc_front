import React, { useState, useEffect, useCallback, useRef } from "react";
import {Button, Modal, Pressable, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import tw from 'tailwind-react-native-classnames'
import {useRecoilValue} from "recoil";
import api from "../api";
import {URL_PATIENT, URL_SCHEDULE} from "../constants/ApiUrl";
import CalendarStrip from 'react-native-calendar-strip'
import Form from "../components/Form";
import {Input} from "react-native-elements";
import ModalWindow  from "../components/ModalWindow"
import { PRESENT_DATE_FORMAT } from "../constants/constants"
import dayjs from "dayjs"
import moment from "moment";


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
const dialogueParams = {
    title: "Добавить событие",
    submitLabel: "Добавить"
}

export default ({navigation, route: { params: { id = 1 } = {} } }) => {
    const [patientState, setPatientState] = useState({})
    const [scheduleList, setScheduleList] = useState([])

    const [customScheduleList, setCustomScheduleList] = useState([
        {
            id:1,
            id_patient: 1,
            id_doctor: 2,
            at_date: "28.10.2021",
            at_time: "11:40",
            days: "",
            title: "test event",
            description: " tetst stesdfs asdfasdf sdf sdf sdf sdf sd f",
            notify_doctor: false,
            remind_in_advance: 0,
            requires_confirmation: false,
        },
        {
            id:2,
            id_patient: 1,
            id_doctor: 2,
            at_date: "",
            at_time: "",
            days: ["Mo", "Tu", "We", 14],
            title: "test event2",
            description: " tetst stesdfs asdfasdf sdf sdfasda sdf sdf sd f",
            notify_doctor: true,
            remind_in_advance: 3,
            requires_confirmation: false,
        },
        {
            id:3,
            id_patient: 1,
            id_doctor: 2,
            at_date: "03.11.2021",
            at_time: "11:40",
            days: "",
            title: "test event",
            description: " tetst stesdfs asdfasdf sdf sdf sdf sdf sd f",
            notify_doctor: false,
            remind_in_advance: 0,
            requires_confirmation: false,
        },
    ])

    const [scheduleForThisDay, setScheduleForThisDay] = useState([])

    const [newScheduleState, setNewScheduleState] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedData, setSelectedData] = useState("")

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

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const rawData = await fetch(`${URL_SCHEDULE}?user_id=${id}`, { method: "GET" })
    //
    //             setScheduleList(await rawData.json())
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     })()
    // }, [id])

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
        setSelectedData(data.format(PRESENT_DATE_FORMAT))
        // setScheduleForThisDay()
    } ,[selectedData, setSelectedData])


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

    // {
    //     id:2,
    //       id_patient: 1,
    //   id_doctor: 2,
    //   at_date: "",
    //   at_time: "",
    //   days: ["M", "T", "W", 14],
    //   title: "test event2",
    //   description: " tetst stesdfs asdfasdf sdf sdfasda sdf sdf sd f",
    //   notify_doctor: true,
    //   remind_in_advance: 3,
    //   requires_confirmation: false,
    // },

    const parsingScheduleList = useCallback(() => {
        let data = dayjs(selectedData, PRESENT_DATE_FORMAT).valueOf()
        // console.log(selectedData, 5465546)

        // в цикле получаем даты за 15 дней до today
        // сравниваем эти даты с at_date из массива расписаний
        // если совпадение есть
        // то объект совпадающий складываем в массив под ключом at_date

        // как положить объект в массив при совпадении?

        // при загрузке страницы получаем сегодняшний день
        // собираем массив дат на месяц: 15 дней до с.д, с.д, 15 дней после с.д
        const month = []
        let i = 1
        for (i; i < 16; i++) {
            month.push(moment().subtract(i, 'days').format(PRESENT_DATE_FORMAT))
            month.push(moment().add(i, 'days').format(PRESENT_DATE_FORMAT))
        }
        month.push(moment().format(PRESENT_DATE_FORMAT))
        // console.log(month)

        // находим в month все пон, вт, ср и т.п
        // засовываем их в массив под ключами Mo Tu We Th Fr Sa Su в объекте

//         const daysOfWeekForMonth = month.reduce((acc, item) => {
//             console.log(moment(item, PRESENT_DATE_FORMAT).format( 'dddd' ), item);
//             switch (moment(item, PRESENT_DATE_FORMAT).format( 'dddd' )) {
//                 case "Monday":
//                     return acc.Mo.push(item)
//                 case "Tuesday":
//                     return acc.Tu.push(item)
//                 case "Wednesday":
//                     return acc.We.push(item)
//                 case "Thursday":
//                     return acc.Th.push(item)
//                 case "Friday":
//                     return acc.Fr.push(item)
//                 case "Saturday":
//                     return acc.Sa.push(item)
//                 case "Sunday":
//                     return acc.Su.push(item)
//                 default:
//                     console.log("День недели не определен")
//             }
//             return acc
//         }, {
//             Mo: [],
//             Tu: [],
//             We: [],
//             Th: [],
//             Fr: [],
//             Sa: [],
//             Su: []
//         })
//
// console.log(daysOfWeekForMonth)

        // собираем объект с ключами датами и данными к этой дате
        const aaa = customScheduleList.reduce((acc, item) => {
            const { at_date, days } = item
            if (at_date) {
                if (!acc[at_date]) {
                    acc[at_date] = []
                }
                acc[at_date].push(item)

                // let i = 0
                // for (i; i < 16; i++) {
                //     // console.log(dayjs(at_date, PRESENT_DATE_FORMAT).valueOf() === dayjs(moment().subtract(i, 'days').format(PRESENT_DATE_FORMAT), PRESENT_DATE_FORMAT).valueOf())
                //     // console.log(moment().subtract(i, 'days').format(PRESENT_DATE_FORMAT))
                // }

                // acc[at_date] = []
            }

            // когда проходим по days: ["M", "T", "W", 14]
            // смотрим на данные, если данные string то это день недели
            // иначе это конкретный день. в данном случае 14 день в месяце

            // Mo Tu We Th Fr Sa Su
        // days: ["Mo", "Tu", "We", 14] - 14 это
            if (days) {
                days.forEach((i) => {
                    if (typeof i === "number") {
                        // получаем число месяца
                        // находим в month такое же число данного месяца
                        // и берем его как ключ
                        // в массив добавляем данные
                        // и все это добавляем acc
                        console.log(5, i)
                    } else {
                        console.log(i)
                        // ищем в daysOfWeekForMonth по i
                        // массив с датами
                        // берем каждую дату как ключ
                        // в массив добавляем данные
                        // и все это добавляем acc
                    }
                })
            }
            return acc
        }, {})

        console.log(aaa, 545)

        // получаем данные расписания на выбранный день
        const {[selectedData]: state } = aaa
        // console.log(state)
        setScheduleForThisDay(state)

        // {
        //     "18.10.2021": [
        //     {
        //             id:1,
        //             id_patient: 1,
        //             id_doctor: 2,
        //             at_date: "28.10.2021",
        //             at_time: "11:40",
        //             days: "",
        //             title: "test event",
        //             description: " tetst stesdfs asdfasdf sdf sdf sdf sdf sd f",
        //             notify_doctor: false,
        //             remind_in_advance: 0,
        //             requires_confirmation: false,
        //    },
        // ]
        // }
    }, [selectedData])


    // делаем загрузку всех расписаний с бэка
    // определяем сегодняшний день
    // получаем число дня за 15 дней до с.д и число за 15 дней после с.д
    // так получаем месяц, т.е с какого по какое число
    // собираем объект на месяц с ключами-датами по всему расписанию
    // для этого проходим по массиву и берем только те ключи которые не младше и не старше нашего месяца
    // в этот объект в его пустые массивы складываем данные
    // нажимаем на день в календаре
    // выводится данные события на этот день

    return (
        <View style={tw`bg-white h-full`}>
            <CalendarStrip
                style={{height:150, paddingTop: 20, paddingBottom: 10}}
                onDateSelected={selectDate}
            />
            <View>
                {scheduleForThisDay?.map(({ title, id, description }) => (
                    <TouchableOpacity key={id}>
                        <Text>{title}</Text>
                        <Text>{description}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    onPress={parsingScheduleList}
                >
                    <Text>Добавить курс</Text>

                </TouchableOpacity>
            </View>

            <ModalWindow
              dialogueParams={dialogueParams}
              onSubmit={createSchedule}
              onClose={closeModal}
              modalVisible={modalVisible}
            >
                <Form
                  style={styles.form}
                  fields={fields}
                  value={newScheduleState}
                  onChange={setNewScheduleState}
                />
            </ModalWindow>
        </View>
    )
}


//вывод события пациента по выбранному дню
// добавление события
// событие можно добавить по разному алгоритму
// на конкретный день
// по дням недели
// ежедневно, ежемесячно повторять

const styles = StyleSheet.create({
    form: {
        width: 300
    },
})
