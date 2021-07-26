import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from "./signUp";
import {Route} from "react-router-native";
import Footer from "../components/Footer";

const Auth = props => {
    return (
        <View>
            <Route path="/sign-up" component={SignUp} />
            <Footer />
        </View>
    );
};

Auth.propTypes = {

};

export default Auth;