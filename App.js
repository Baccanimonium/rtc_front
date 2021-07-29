import { StatusBar } from 'expo-status-bar';
import React, {useMemo} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box, Button } from 'native-base';
import { NativeRouter, Route, Link } from "react-router-native";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Auth from "./pages/Auth";
import UnAuth from "./pages/UnAuth";
export const Example = () => {
  return <Button onPress={() => console.log("hello world")}>PRIMARY</Button>
}
const authorizated = true

export default function App() {
  const Branch = useMemo(() => authorizated ? Auth : UnAuth,[authorizated])
  return (
    <NativeRouter>
      <NativeBaseProvider>
        <View style={styles.container}>
          <Branch />
        </View>
      </NativeBaseProvider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 25
  },
});
