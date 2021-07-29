import React, {Component, useCallback, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { Input } from 'native-base';
import { Formik } from 'formik';

import {BACKEND_URL} from "../../constants";
import {URL_SIGN_UP} from "../../apiList";
import {withRouter} from "react-router-native";

const initialValues = {
    login: "",
    password: "",
}

const SingUp = ({ history }) => {

    const makeLogin = useCallback(async (formValue) => {
        try {

            await fetch(`${BACKEND_URL}/${URL_SIGN_UP}`, {
                   method: 'POST',
                   headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(formValue)
               });
            history.push("/")
        } catch (e){
            console.log(e)
        }

    },[])
    return (
        <View>
            <Formik
                initialValues={initialValues}
                onSubmit={makeLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <Input
                            style={styles.input}
                            w="100%"
                            mx={3}
                            placeholder="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
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
                        <Input
                            w="100%"
                            mx={3}
                            placeholder="About"
                            style={styles.input}
                            onChangeText={handleChange('about')}
                            onBlur={handleBlur('about')}
                            value={values.about}
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
                            placeholder="Address"
                            style={styles.input}
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address}
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
                            placeholder="Phone"
                            style={styles.input}
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
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

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
    },
});


SingUp.propTypes = {};

export default withRouter(SingUp);