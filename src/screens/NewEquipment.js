import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';


const NewEquipment = ({navigation}) => {

  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [actualDate, setActualDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setActualDate(currentDate);
    setDate(currentDate.toDateString());
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: actualDate,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const registerEquipment = async () => {
    try{
      if(!code || !description || !value || !date) {
        Alert.alert("Please fill all info");
        return;
      }
      const token = await AsyncStorage.getItem("token");
      console.log(actualDate)
      await axios.post(`${BASE_URL}/api/equipment/new`, {
        code,
        description,
        value,
        dateOfAcquisition: actualDate
      }, {
        headers: {
          Authorization: token
        }
      })
      setCode('')
      setDescription('');
      setValue('');
      setDate('');
      setActualDate(new Date())
      Alert.alert("Equipment registered");
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.heading}>New Equipment</Text>
        <View>
          <TextInput 
            style={styles.input}
            placeholder='Code'
            value={code}
            onChangeText={(value)=>setCode(value)}
          />
        </View>
        <View>
          <TextInput 
            style={[styles.input, {
              height: 100
            }]}
            placeholder='Description'
            value={description}
            onChangeText={(value)=>setDescription(value)}
            multiline={true}
          />
        </View>
        <View>
          <TextInput 
            style={styles.input}
            placeholder='Value'
            value={value}
            onChangeText={(changeValue)=>setValue(changeValue)}
          />
        </View>

        <View>
          <TextInput 
            style={styles.input}
            placeholder='Date of Acquisition'
            value={date}
            onPressIn={()=>showMode()}
          />
        </View>
      
        <View>
          <TouchableOpacity 
            style={styles.submitBtn}
            onPress={registerEquipment}
          >
            <Text style={styles.text}>Register equipment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default NewEquipment

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
    height: 600,
  },
  input: {
    borderColor: '#999',
    borderWidth: 2,
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