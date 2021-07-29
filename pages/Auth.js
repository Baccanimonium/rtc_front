import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from "./signUp";
import {Route} from "react-router-native";
import Footer from "../components/Footer";

const Auth = props => {
    return (
        <View style={{ height: "100%" }}>
            <Route path="/sign-up" component={SignUp} />
            <Footer>
                <Text>D</Text>
                <Text>S</Text>
                <Text>C</Text>
                <Text>P</Text>
            </Footer>
        </View>
    );
};

Auth.propTypes = {

};

export default Auth;