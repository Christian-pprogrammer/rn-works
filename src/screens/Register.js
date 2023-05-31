import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import generatePassword from '../utils/generatePassword';
import axios from 'axios';

const Register = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [regenerate, setRegenerate] = useState(false);

  const register = async () => {
    try{
      if(!username || !password) {
        Alert.alert('Please enter all fields');
        return;
      }
      const newUser = {
        username,
        password
      }
      await axios.post("/api/users/register", newUser);
      Alert.alert('User Registered successfully');
      navigation.navigate("Login");
    }catch(err) {
      Alert.alert('There was an error');
    }
  }

  const getPassword = async () => {
    try{
      setRegenerate(true)
      const newPass = await generatePassword();
      setPassword(newPass)
    }catch(err) {
      console.log(err.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.heading}>Register</Text>
        <View>
          <TextInput 
            style={styles.input}
            placeholder='Login(Username)'
            value={username}
            onChangeText={(value)=>setUsername(value)}
          />
        </View>
        <View style={styles.passwordView}>
          <TextInput 
            placeholder='Password'
            value={password}
            onChangeText={(value)=>setPassword(value)}
            style={[styles.input, {flex: 1}]}
            editable={false}
          />
          <TouchableOpacity
            style={[styles.submitBtn, {padding: 10}]}
            onPress={()=>getPassword()}
          >
            <Text style={styles.text}>
              {regenerate ? 'Regenerate':'Generate'}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity 
            style={styles.submitBtn}
            onPress={register}
          >
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.other}>
          <Text>Have an account?</Text><TouchableOpacity onPress={()=>navigation.navigate('Login')}><Text>Login</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5eaf1',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 30
  },
  form: {
    width: '100%',
    padding: 10,
    height: 400,
  },
  input: {
    borderColor: '#999',
    borderWidth: 2,
    borderRadius: 50,
    fontSize: 17,
    paddingHorizontal: 20,
    height: 50,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  submitBtn: {
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3e4684',
    height: 50,
    marginVertical: 10
  },
  text: {
    color: '#fff',
    fontSize: 17
  },
  other: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  passwordView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})