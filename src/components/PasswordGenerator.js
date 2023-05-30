import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getRandomBytesAsync } from 'expo-crypto';

const PasswordGenerator = ({ onGenerate }) => {
  const [password, setPassword] = useState('');

  const generatePassword = async () => {
    const length = 10; // Set the desired length of the password

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let characters = uppercase + lowercase + numbers + specialChars;
    let generatedPassword = '';

    try {
      const randomBytes = await getRandomBytesAsync(length);
      for (let i = 0; i < length; i++) {
        generatedPassword += characters[randomBytes[i] % characters.length];
      }

      setPassword(generatedPassword);
      onGenerate(generatedPassword);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
       <Text>{password}</Text>
       <Button title="Generate Password" onPress={generatePassword} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  password: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default PasswordGenerator;
