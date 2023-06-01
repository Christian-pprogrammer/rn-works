import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Select = ({navigation}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={[styles.submitBtn, {padding: 10}]}
          onPress={()=>navigation.navigate("NewEquipment")}
        >
        <Text style={styles.text}>
          Register new equipment
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={[styles.submitBtn, {padding: 10}]}
          onPress={()=>navigation.navigate("ListEquipment")}
        >
        <Text style={styles.text}>
          List registerd equipment
        </Text>

      </TouchableOpacity>
    </View>
  )
}

export default Select

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5eaf1',
  },
  text: {
    color: '#fff',
    fontSize: 17
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
})