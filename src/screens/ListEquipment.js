import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/constants'
import Equipment from '../components/Equipment'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ListEquipment = () => {
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
        console.log(err);
      }
    }
    fetchEquipment()
  }, [])
  const handleDelete = (id) => {
    const newEquipment = equipment.filter((equipment)=>equipment._id != id);
    setEquipment(newEquipment);
  }
  return (
    <View>
      <FlatList 
        data={equipment}
        renderItem={({item})=><Equipment element={item} handleDelete={handleDelete} />}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default ListEquipment

const styles = StyleSheet.create({})