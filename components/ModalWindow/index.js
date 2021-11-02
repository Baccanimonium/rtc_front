import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import React from "react";
import PropTypes from "prop-types"

export const ModalWindow = ({
                  dialogueParams: {title, submitLabel},
    children, loading, onSubmit, onClose, modalVisible, disabledClose, transparent
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={transparent}
      visible={modalVisible}
      onRequestClose={() =>
        !modalVisible
      }
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Button title="x" onPress={onClose} style={styles.buttonClose} disabled={disabledClose}/>
          <Pressable
            style={styles.buttonClose}
            onPress={() => !modalVisible}
          >
            <Text style={styles.textStyle}>{title}</Text>
            {children}
            <Button style={styles.button} title={submitLabel} onPress={onSubmit} loading={loading}/>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

ModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  dialogueParams: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  offsetTop: PropTypes.string,
  width: PropTypes.string,
  loading: PropTypes.bool,
  transparent: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}
ModalWindow.defaultProps = {
  dialogueParams: {},
  width: "440px",
  transparent: true
}

export default ModalWindow

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    textAlign: "center"
  },
  buttonClose: {
    backgroundColor: "transparent",
    marginLeft: "auto"
  },
  buttonsContainer: {

  }
})
