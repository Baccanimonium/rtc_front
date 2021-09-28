import React, {useCallback, useRef, useState} from "react";
import { StyleSheet, Text, View, Button, Modal, Pressable, Alert } from "react-native";
import tw from 'tailwind-react-native-classnames'
import {URL_LOGIN, URL_PATIENT, URL_USERS} from "../constants/ApiUrl";
import {useRecoilValue} from "recoil";
import api from "../api";
import { useEffect } from "react"
import Form from "../components/Form";
import {Input} from "react-native-elements";

const fields = [
  {
    id: "description",
    component: Input,
    autoFocus: true,
    placeholder: "Описание"
  }
]

export default () => {
  const [users, setUsers] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [formState, setFormState] = useState({})
  const [idUser, setIdUser] = useState("")

  const fetch = useRecoilValue(api)
  const formStateRef = useRef(formState)
  formStateRef.current = {...formState, id_user: idUser}

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
  },[])

 const addPatient = useCallback( (id) => () => {
   setModalVisible(true)
   setIdUser(id)
 }, [])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  const add = useCallback(async () => {
    try {

      await new Promise(resolve => {
        setTimeout(resolve, 3000)
        console.log(8888)
        // setModalVisible(false)
      })

      // todo сделать после
    // const data = await fetch(URL_PATIENT, {
    //     method: 'POST',
    //     body: JSON.stringify(formStateRef.current)
    //   })
      // получаем айди для перехода на страницу пациента
    //   const {id} = await data.json()
    } catch (e) {
      console.log(e)
    }

  }, [])

  return (
    <View style={tw`bg-white h-full`}>
      <Text>UserListScreen2</Text>
      {users.map(({id, login, address, name, password, about, phone}) => (
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible)}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button title="x" onPress={closeModal} style={styles.buttonClose} />
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Добавление пациента</Text>
              <Form
                style={styles.form}
                fields={fields}
                value={formState}
                onChange={setFormState}
              />
              <Button style={styles.button} title="Добавить" onPress={add} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}


// спинер на кнопке
// после 3 секунд закрывать модалку и открывать алерт
// в алерте Пациент 1 добавлен и кнопка Ок
// при нажатии на кнопку переход на страницу пациента

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    textAlign: "center"
  },
  button: {
    padding: 10,
    elevation: 2
  },
  form: {
    width: 300
  },
  buttonClose: {
    backgroundColor: "transparent",
    marginLeft: "auto"
  }
})
