import React, { useState } from 'react';
import { View, Modal, TextInput, Button, StyleSheet } from 'react-native';

const CustomModal = ({ visible, onClose, onSubmit, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder={placeholder}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: '20%'
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

export default CustomModal;
