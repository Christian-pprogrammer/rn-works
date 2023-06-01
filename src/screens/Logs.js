import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/constants'
import Equipment from '../components/Equipment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Log from '../components/Log'
import getError from '../utils/getError'

const Logs = ({navigation, route}) => {
  const [logs, setLogs] = useState([]);
  useEffect(()=>{
    const fetchLogs = async () => {
      const token = await AsyncStorage.getItem("token");
      try{
        const res = await axios.get(`${BASE_URL}/api/logs`, {
          headers: {
            Authorization: token
          }
        });
        setLogs(res.data.logs);
      }catch(err) {
        Alert.alert(getError(err));
      }
    }
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLogs();
    });
  }, [])

  return (
    <View>
      <FlatList 
        data={logs}
        renderItem={({item})=><Log logItem={item} />}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default Logs

const styles = StyleSheet.create({})