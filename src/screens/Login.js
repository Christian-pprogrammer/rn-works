import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Register = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try{
      
    }catch(err) {

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.heading}>Login</Text>
        <View>
          <TextInput 
            style={styles.input}
            placeholder='Login(Username)'
            value={username}
            onChangeText={(value)=>setUsername(value)}
          />
        </View>
        <View>
          <TextInput 
            style={styles.input}
            secureTextEntry
            placeholder='Password'
            value={password}
            onChangeText={(value)=>setPassword(value)}
          />
        </View>
        <View>
          <TouchableOpacity 
            style={styles.submitBtn}
            onPress={register}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.other}>
          <Text>Don't have an account?</Text><TouchableOpacity onPress={()=>navigation.navigate('Register')}><Text>Register</Text></TouchableOpacity>
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
    backgroundColor: '#fff'
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
  }
})