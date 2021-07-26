import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Input } from 'react-native';

class SingUp extends Component {
    render() {
        return (
            <View>
                <Text>SingUp</Text>
                <Input
                    w="100%"
                    mx={3}
                    placeholder="Default Input"
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
                    placeholder="Default Input"
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
                    placeholder="Default Input"
                    _light={{
                        placeholderTextColor: "blueGray.400",
                    }}
                    _dark={{
                        placeholderTextColor: "blueGray.50",
                    }}
                />
            </View>
        );
    }
}

SingUp.propTypes = {};

export default SingUp;