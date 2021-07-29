import React from "react";
import Auth from "./pages/Auth";
import UnAuth from "./pages/UnAuth";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"

const Stack = createStackNavigator()

export default function Navigate () {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="UnAuth"
                component={UnAuth}
                options={{title: "UnAuth"}}
            />
            <Stack.Screen
                name="Auth"
                component={Auth}
                options={{title: "Auth"}}
            />
            <Stack.Screen
                name="sign-in"
                component={SignIn}
                options={{title: "sign-in"}}
            />
            {/*<Stack.Screen*/}
            {/*    name="App"*/}
            {/*    component={App}*/}
            {/*    options={{title: "App"}}*/}
            {/*/>*/}
        </Stack.Navigator>
    </NavigationContainer>
}