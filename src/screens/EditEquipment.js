import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import getError from '../utils/getError';


const EditEquipment = ({navigation, route}) => {

  const { item } = route.params;
  console.log(item)

  const [code, setCode] = useState(item.code);
  const [description, setDescription] = useState(item.description);
  const [value, setValue] = useState(item.value);
  const [date, setDate] = useState((new Date(item.dateOfAcquisition)).toDateString());
  const [actualDate, setActualDate] = useState(new Date(item.dateOfAcquisition));
  const [password, setPassword] = useState('');

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

  const editEquipment = async () => {
    try{
      if(!code || !description || !value || !date) {
        Alert.alert("Please fill all info");
        return;
      }
      if(!password) {
        Alert.alert("Password is required");
        return;
      }
      const token = await AsyncStorage.getItem("token");
      await axios.patch(`${BASE_URL}/api/equipment/update/${item._id}`, {
        code,
        description,
        value,
        dateOfAcquisition: actualDate,
        password
      }, {
        headers: {
          Authorization: token
        }
      })
      setCode('')
      setDescription('');
      setValue('');
      setDate('');
      setActualDate(new Date());
      setPassword('');
      Alert.alert("Equipment updated");
      navigation.navigate("ListEquipment", {item: item});
    }catch(err) {
      Alert.alert(getError(err));
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ScrollView style={styles.form}>
        <Text style={styles.heading}>Edit Equipment</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Code</Text>
          <TextInput 
            style={styles.input}
            placeholder='Code'
            value={code}
            onChangeText={(value)=>setCode(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Value</Text>
          <TextInput 
            style={styles.input}
            placeholder='Value'
            value={value}
            onChangeText={(changeValue)=>setValue(changeValue)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Acquisition Date</Text>
          <TextInput 
            style={styles.input}
            placeholder='Date of Acquisition'
            value={date}
            onPressIn={()=>showMode()}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input}
            placeholder='Enter your login password'
            value={password}
            onChangeText={(value)=>setPassword(value)}
          />
        </View>
      
        <View>
          <TouchableOpacity 
            style={styles.submitBtn}
            onPress={editEquipment}
          >
            <Text style={styles.text}>Edit equipment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  )
}

export default EditEquipment

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  inputContainer: {
    justifyContent: 'center',
    marginTop: 5
  },
  label: {
    marginBottom: 0,
    fontSize: 16,
    marginBottom: -5
  }
})