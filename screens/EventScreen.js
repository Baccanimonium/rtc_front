import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from 'tailwind-react-native-classnames'
import { Input } from 'react-native-elements';
import { EventItem } from "../mock/event";
import Form from "../components/Form";

const fields = [
    {
        id: "id_patient",
        component: Input,
        label: "Patient"
    },
    {
        id: "id_users",
        component: Input,
        label: "Owner"
    },
    {
        id: "title",
        component: Input,
        label: "Title"
    },
    {
        id: "description",
        component: Input,
        label: "Description"
    },
    {
        id: "time_start",
        component: Input,
        label: "Time start"
    },
    {
        id: "time_end",
        component: Input,
        label: "Time end"
    },
]

export default ({ route: { params }}) => {
    // console.log(params)
    return (
        <Form
            style={tw`pt-4`}
            value={EventItem}
            fields={fields}
        />
    )
}

const styles = StyleSheet.create({

})

