import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import CustomModal from './CustomModal'
import axios from 'axios'
import { BASE_URL } from '../constants/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Log = ({logItem}) => {
  return (
    <View style={styles.item}>
      <View>
        <View style={styles.dataItem}>
          <Text style={styles.text}>User: </Text><Text style={styles.text}>{logItem.username}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.text}>Message: </Text><Text style={styles.text}>{logItem.logMessage}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.text}>Date: </Text><Text style={styles.text}>{logItem.date}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.text}>Time: </Text><Text style={styles.text}>{logItem.time}</Text>
        </View>
      </View>
    </View>
  )
}

export default Log

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#3e4684',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dataItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 5,
    flexWrap: 'wrap'
  },
  text: {
    color: '#fff',
    fontSize: 17
  }
})