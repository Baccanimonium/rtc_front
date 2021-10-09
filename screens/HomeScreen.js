import React from "react";
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import tw from 'tailwind-react-native-classnames'
import {userNearestEvents} from "../mock/event";
import {useNavigation} from "@react-navigation/native";
import { Icon } from 'react-native-elements'
import {
    SCREEN_CHAT,
    SCREEN_EVENT, SCREEN_MY_PROFILE,
    SCREEN_PATIENTS_LIST,
    SCREEN_STATISTIC,
    SCREEN_TASK_LIST,
    SCREEN_USERS
} from "../constants/ScreensNames";

const WorkBench = [
    {
        title: 'Patient list',
        icon: "dingding",
        route: SCREEN_PATIENTS_LIST
    },
    {
        title: 'User list',
        icon: "users",
        route: SCREEN_USERS
    },
    {
        title: "Tasks",
        icon: "book",
        route: SCREEN_TASK_LIST
    },
    {
        title: 'Chat',
        icon: "wechat",
        route: SCREEN_CHAT
    },
    {
        title: 'Statistic',
        icon: "creditcard",
        route: SCREEN_STATISTIC
    },
    {
        title: 'My Profile',
        icon: "profile",
        route: SCREEN_MY_PROFILE
    },
]

export default () => {
    const navigation = useNavigation()
    return (
        <View style={tw`bg-white h-full pt-12 px-4`}>
            <Text style={tw`text-xl mb-4 font-semibold`}>Предстоящие события</Text>
            <FlatList
                data={userNearestEvents}
                keyExtractor={({id}) => id}
                renderItem={({ item: { id, id_patient, title, description, time_start, time_end } }) => (
                    <TouchableOpacity
                        style={tw`mb-4 bg-gray-100 p-2 rounded-xl`}
                        onPress={() => navigation.navigate(SCREEN_EVENT, { id })}
                    >
                        <Text style={tw`text-base font-medium`}>{title}</Text>
                        <Text style={tw`text-xs`}>{description}</Text>
                        <View style={tw`flex-row mt-2`}>
                            <Text style={tw`text-sm font-medium`}>{id_patient}</Text>
                            <Text style={tw`text-sm ml-auto font-medium`}>{time_start}</Text>
                            <Icon
                                style={tw`bg-black rounded-full w-5 p-1 ml-2`}
                                name="arrowright"
                                color="white"
                                type="antdesign"
                                size={12}
                            />
                        </View>

                    </TouchableOpacity>)
                }
            />
            <View style={tw`flex-wrap flex-row`}>
                {WorkBench.map(({ title, route, icon }) => (
                    <TouchableOpacity
                        key={title}
                        style={tw`p-2 pl-6 pb-6 pt-4 bg-gray-200 m-2 w-40 flex-row items-center rounded-xl`}
                        onPress={() => navigation.navigate(route)}
                    >
                        <Text style={tw`mt-2 text-lg font-semibold`}>{title}</Text>
                        <Icon
                            style={tw`bg-black rounded-full w-5 p-1 ml-4 mt-3 `}
                            name={icon}
                            color="white"
                            type="antdesign"
                            size={12}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    eventRelatedUserAndTimeContainer: {

    }
})

