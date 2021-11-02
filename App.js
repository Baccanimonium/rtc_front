import "./plugins/dayjs"
import React from 'react';
import {RecoilRoot} from 'recoil';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer} from '@react-navigation/native'
import Routes from "./Routes";

import {StatusBar} from "expo-status-bar";
import UserProfileLoaderContainer from "./core/UserUploaderContext";
import {Text} from "react-native";
import PatientScreen from "./screens/PatientScreen";

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
                <SafeAreaProvider>
                    <React.Suspense fallback={<Text>loading</Text>}>
                        <UserProfileLoaderContainer>
                          <Routes/>
                          {/*  <PatientScreen/>*/}
                        </UserProfileLoaderContainer>
                    </React.Suspense>
                </SafeAreaProvider>
            </NavigationContainer>
        </RecoilRoot>
    );
}

