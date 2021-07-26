import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box, Button } from 'native-base';
import {Link, Route, useLocation } from "react-router-native";
import SignIn from "./signIn";
import SignUp from "./signUp";
import Footer from "../components/Footer";

const UnAuth = props => {
    const { pathname } = useLocation()
    return (
        <View style={styles.container}>
            {pathname !== "/sign-in" &&  <Link style={styles.signInButton} to="/sign-in">
                <Text>Sign in</Text>
            </Link>}
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Footer />
        </View>
    );
};

UnAuth.propTypes = {
    
};

export default UnAuth;

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    signInButton: {
        marginTop: 15,
        alignItems: 'center',
        fontSize: 25
    },
    logInContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});
