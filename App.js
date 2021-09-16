import React from 'react';
import { RecoilRoot } from 'recoil';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native'
import Routes from "./Routes";

import { StatusBar } from "expo-status-bar";

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
                <Routes/>
              </SafeAreaProvider>
          </NavigationContainer>
      </RecoilRoot>
  );
}

