import React, {Component, useCallback, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { withRouter } from "react-router-native";
import { Input } from 'native-base';
import { Formik } from 'formik';

import PropTypes from 'prop-types';
import {BACKEND_URL} from "../../constants";
import {URL_SIGN_UP} from "../../apiList";

const initialValues = {
    name: "",
    login: "",
    password: "",
    about: "",
    address: "",
    phone: ""
}

const SingIn = ({ history }) => {
    const createNewUser = useCallback(async (formValue) => {
        try {

         await fetch(`${BACKEND_URL}/${URL_SIGN_UP}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValue)
            });
            history.push("/sign-up")
        } catch (e){
            console.log(e)
        }

    },[])
        return (
            <View>
                <Formik
                    initialValues={initialValues}
                    onSubmit={createNewUser}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <Input
                                w="100%"
                                mx={3}
                                style={styles.input}
                                placeholder="login"
                                onChangeText={handleChange('login')}
                                onBlur={handleBlur('login')}
                                value={values.login}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <Input
                                w="100%"
                                mx={3}
                                type="password"
                                placeholder="Password"
                                style={styles.input}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                _light={{
                                    placeholderTextColor: "blueGray.400",
                                }}
                                _dark={{
                                    placeholderTextColor: "blueGray.50",
                                }}
                            />
                            <View style={styles.input}>
                                <Button onPress={handleSubmit} title="Submit"  />
                            </View>
                        </View>
                    )}
                </Formik>


            </View>
        );
}

SingIn.propTypes = {};

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
    },
});


export default withRouter(SingIn);