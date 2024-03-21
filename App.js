
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { useState } from 'react';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
  const [text, setText] = useState('');
  const alertMyText = () =>{
    Alert.alert(text);
  }
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
        name="Start"
        component={Start}
        />
        <Stack.Screen
        name="Chat"
        component={Chat}
        />
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}




export default App;