import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import Select from './src/screens/Select';
import ListEquipment from './src/screens/ListEquipment';
import NewEquipment from './src/screens/NewEquipment';
import EditEquipment from './src/screens/EditEquipment';
import Logs from './src/screens/Logs';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Select" component={Select} />
        <Stack.Screen name="ListEquipment" component={ListEquipment} options={{headerShown: true, headerTitle: "List Equipment"}} />
        <Stack.Screen name="NewEquipment" component={NewEquipment} options={{headerShown: true, headerTitle: "New Equipment"}} />
        <Stack.Screen name="EditEquipment" component={EditEquipment} options={{headerShown: true, headerTitle: "New Equipment"}} />
        <Stack.Screen name="Logs" component={Logs} options={{headerShown: true, headerTitle: "All logs"}} />
      </Stack.Navigator>
    </NavigationContainer>
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
