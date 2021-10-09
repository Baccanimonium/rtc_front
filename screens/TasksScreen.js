import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import tw from 'tailwind-react-native-classnames'
import {userTasks} from "../mock/tasks";

// TODO добавить группировку тасок по пользователю/курсу
export default () => {
    return (
        <View style={tw`pt-6 px-4 bg-white`}>
            {userTasks.map(({id, description, course_id, id_users, event_id, count, critical}) => (
                <TouchableOpacity
                    key={id}
                    style={tw`mb-4 ${critical || count > 2 ? "bg-red-200" : "bg-gray-100"} p-2 rounded-xl`}
                >
                    <Text>{description}</Text>
                    <View
                        style={tw`flex-row items-center justify-between mt-2`}
                    >
                        <Text>{id_users}</Text>
                        <Text>Событие пропущенно: {count} раз</Text>
                    </View>

                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({})

