import "./plugins/dayjs"
import React, {useEffect} from 'react';
import {RecoilRoot} from 'recoil';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer} from '@react-navigation/native'
import Routes from "./Routes";

import {StatusBar} from "expo-status-bar";
import UserProfileLoaderContainer from "./core/UserUploaderContext";
import ContextProviderRtcState from "./RTC/ContextProviderRtcState";
import {Text} from "react-native";

// TODO Сделать логин по HWID
// import {getUniqueId} from 'react-native-device-info';


export default function App() {

    // useEffect(() => {
    //     console.log(getUniqueId)
    // }, [])

    return (
        <RecoilRoot>
            <StatusBar style="light"/>
            <NavigationContainer>
                <ContextProviderRtcState>
                    <SafeAreaProvider>
                        <React.Suspense fallback={<Text>loading user state</Text>}>
                            <UserProfileLoaderContainer>
                                <Routes/>
                            </UserProfileLoaderContainer>
                        </React.Suspense>
                    </SafeAreaProvider>
                </ContextProviderRtcState>
            </NavigationContainer>
        </RecoilRoot>
    );
}

