import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PasswordGenerator from './src/components/PasswordGenerator';

export default function App() {
  return (
    <View style={styles.container}>
      <PasswordGenerator onGenerate={(password)=>console.log(password)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
