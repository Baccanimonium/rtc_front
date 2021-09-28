import React, {useEffect, useState} from "react";
import HomeScreen from "./screens/HomeScreen";
import DoctorScreen from "./screens/DoctorScreen";
import EventScreen from "./screens/EventScreen";
import PatientList from "./screens/PatientList";
import TasksScreen from "./screens/TasksScreen";
import {
    SCREEN_HOME,
    SCREEN_DOCTORS,
    SCREEN_EVENT,
    SCREEN_PATIENTS_LIST,
    SCREEN_TASK_LIST,
    SCREEN_STATISTIC,
    SCREEN_CHAT,
    SCREEN_MY_PROFILE,
    SCREEN_LOGIN,
    SCREEN_REGISTER,
    SCREEN_DIALOG,
} from "./constants/ScreensNames";
import ChatScreen from "./screens/ChatScreen/Screens/ChannelsScreen";
import StatisticScreen from "./screens/StatisticScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import LoginScreen from "./screens/AuthScreens/LoginScreen";
import RegisterScreen from "./screens/AuthScreens/RegisterScreen";
import tw from "tailwind-react-native-classnames";
import Navigation from "./Navigation";
import {SafeAreaView} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as SecureStore from 'expo-secure-store';
import {useRecoilState, useRecoilValue} from "recoil";
import CurrentUserState, {tokenAtom} from "./store/user";
import {Text} from "react-native";
import DialogScreen from "./screens/ChatScreen/Screens/DialogScreen";
import {Socket} from "./Socket";
import ChatSocketHandlers from './screens/ChatScreen/SocketHandler'


const PublicRoutes = [
    // {
    //     name: SCREEN_CHAT,
    //     component: ChatScreen,
    // },
    {
        name: SCREEN_LOGIN,
        component: LoginScreen,
    },
    {
        name: SCREEN_REGISTER,
        component: RegisterScreen,
    },
]

const Routes = [
    {
        name: SCREEN_CHAT,
        component: ChatScreen,
    },
    {
        name: SCREEN_HOME,
        component: HomeScreen,
        options: {
            headerShown: false
        }
    },
    {
        name: SCREEN_DOCTORS,
        component: DoctorScreen,
    },
    {
        name: SCREEN_EVENT,
        component: EventScreen,
    },
    {
        name: SCREEN_PATIENTS_LIST,
        component: PatientList,
    },
    {
        name: SCREEN_TASK_LIST,
        component: TasksScreen,
    },
    // {
    //     name: SCREEN_CHAT,
    //     component: ChatScreen,
    // },
    {
        name: SCREEN_STATISTIC,
        component: StatisticScreen,
    },
    {
        name: SCREEN_MY_PROFILE,
        component: MyProfileScreen,
    },
    {
        name: SCREEN_DIALOG,
        component: DialogScreen,
    },
]

const Stack = createNativeStackNavigator()

const globalScreenOptions = {
    headerStyle: {backgroundColor: "#2C6BED"},
    headerTitleStyle: {color: "white"},
    headerTintColor: "white"
}

const SocketController = ChatSocketHandlers(Socket)

export default () => {
    const [loading, setLoadingFlag] = useState(true)
    const [{token}, setToken] = useRecoilState(tokenAtom)
    const userData = useRecoilValue(CurrentUserState)

    // Эффект только для первого рендера, получить токен из стораджа
    useEffect(() => {
        (async () => {
            if (!token && loading) {
                const token = await SecureStore.getItemAsync("token")
                if (token) {
                    setToken({token, setToken})
                }
            }
            setLoadingFlag(false)
        })()
    }, [])



    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <SocketController>
                <React.Suspense fallback={<Text>loading</Text>}>
                    {!loading
                        ? (
                            <Stack.Navigator screenOptions={globalScreenOptions}>
                                {(userData.id ? Routes : PublicRoutes).map(({name, component, options}) => (
                                    <Stack.Screen
                                        key={name}
                                        name={name}
                                        component={component}
                                        options={options}
                                    />
                                ))}
                            </Stack.Navigator>
                        )
                        : <Text>loading</Text>
                    }
                </React.Suspense>
                {userData.id && <Navigation/>}
            </SocketController>
        </SafeAreaView>
    )
}