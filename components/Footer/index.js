import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';


const Footer = props => {
    return (
        <View style={styles.container}>
            <Text>Footer</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: "auto",
        borderTopWidth: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderColor: "black"
    }
});


Footer.propTypes = {

};

export default Footer;