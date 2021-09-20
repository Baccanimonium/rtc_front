import React from 'react';
import {Input} from "react-native-elements";
import {View} from "react-native";

export const ErrorInput = ( touched, props, { messageError = "", validLength, value = "" } = props ) => {
    const inputError = () => {
        return  touched ?
            value ?
                value.length < validLength ?
                    `Минимальная длина ${validLength} символов` :
                    false : `${messageError}` : false
    }

    return (
        <View>
            <Input
                {...props}
                errorMessage={inputError()}
            />
        </View>
    );
};

export default ErrorInput
