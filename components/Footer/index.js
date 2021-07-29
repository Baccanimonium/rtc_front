import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';


const Footer = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: "auto",
        flexDirection: "row",
        borderTopWidth: 1,
        height: 50,
        paddingRight: 15,
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: "black"
    }
});


Footer.propTypes = {

};

export default Footer;