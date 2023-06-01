import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import CustomModal from './CustomModal'
import axios from 'axios'
import { BASE_URL } from '../constants/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getError from '../utils/getError'

const Equipment = ({element, handleDelete, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const deleteItem = async () => {
    setModalVisible(true);
  }
  const editItem = async () => {
    navigation.navigate("EditEquipment", {
      item: element
    })
  }
  const handleSubmitInput = async (input) => {
    try{
      const token = await AsyncStorage.getItem("token");
      await axios.post(`${BASE_URL}/api/equipment/delete/${element._id}`, {
        password: input
      }, {
        headers: {
          Authorization: token
        }
      })
      Alert.alert("deleted successfully");      
      handleDelete(element._id);
    }catch(err) {
      Alert.alert(getError(err));
    }
  }
  return (
    <View style={styles.item}>
      <View>
        <View style={styles.dataItem}>
          <Text style={styles.text}>Code: </Text><Text style={styles.text}>{element.code}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.text}>Description: </Text><Text style={styles.text}>{element.description}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.text}>Value: </Text><Text style={styles.text}>{element.value}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.text}>Acquisition Date: </Text><Text style={styles.text}>{(new Date(element.dateOfAcquisition)).toDateString()}</Text>
        </View>
      </View>
      <View>
        <AntDesign name="delete" size={24} color="white" onPress={deleteItem} />
      </View>
      <View>
        <AntDesign name="edit" size={24} color="white" onPress={editItem} />
      </View>
      {
        modalVisible && <CustomModal
          visible={true}
          onClose={()=>setModalVisible(false)}
          onSubmit={handleSubmitInput}
          placeholder="Enter you password"
        />
      }
      
    </View>
  )
}

export default Equipment

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#3e4684',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 5,
    width: '90%',
    flexWrap: 'wrap'
  },
  text: {
    color: '#fff',
    fontSize: 17,
  }
})