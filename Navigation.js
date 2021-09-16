import React from "react";
import {Text, View, FlatList, TouchableOpacity} from "react-native";
import {useNavigation, useNavigationState } from "@react-navigation/native";
import { Icon } from 'react-native-elements'

import {
    SCREEN_CHAT,
    SCREEN_HOME,
    SCREEN_PATIENTS_LIST,
    SCREEN_TASK_LIST
} from "./constants/ScreensNames";
import tw from "tailwind-react-native-classnames";

const items = [
    {
        id: "1",
        icon: "home",
        route: SCREEN_HOME
    },
    {
        id: "2",
        icon: "dingding",
        route: SCREEN_PATIENTS_LIST
    },
    {
        id: "3",
        icon: "wechat",
        route: SCREEN_CHAT
    },
    {
        id: "4",
        icon: "book",
        route: SCREEN_TASK_LIST
    }
]

export default () => {
    const navigation = useNavigation()
    useNavigationState (state => state)
    const currentRoute = navigation.getCurrentRoute()
    return <View style={tw`pt-2 px-2 pb-3 justify-between flex-row border-gray-200 border-t border-solid`}>
        {items.map(({id, icon, route}) => (
            <TouchableOpacity
                key={id}
                onPress={() => navigation.navigate(route)}
            >
                <Icon
                    style={tw`bg-black rounded-full w-8 p-2 ml-4 `}
                    name={icon}
                    color={currentRoute && currentRoute.name === route ? "#777777" : "white"}
                    type="antdesign"
                    size={16}
                />
            </TouchableOpacity>
        ))}
    </View>
}


