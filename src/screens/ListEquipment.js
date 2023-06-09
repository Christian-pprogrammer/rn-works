import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/constants'
import Equipment from '../components/Equipment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getError from '../utils/getError'

const ListEquipment = ({navigation, route}) => {
  const [equipment, setEquipment] = useState([]);
  useEffect(()=>{
    const fetchEquipment = async () => {
      const token = await AsyncStorage.getItem("token");
      try{
        const res = await axios.get(`${BASE_URL}/api/equipment/list`, {
          headers: {
            Authorization: token
          }
        });
        setEquipment(res.data);
      }catch(err) {
        Alert.alert(getError(err))
      }
    }
    const unsubscribe = navigation.addListener('focus', () => {
      fetchEquipment();
    });
  }, [])
  const handleDelete = (id) => {
    const newEquipment = equipment.filter((equipment)=>equipment._id != id);
    setEquipment(newEquipment);
  }

  return (
    <View>
      <FlatList 
        data={equipment}
        renderItem={({item})=><Equipment element={item} handleDelete={handleDelete} navigation={navigation} />}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default ListEquipment

const styles = StyleSheet.create({})