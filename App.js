
import { Alert, Logbox } from 'react-native';
import { useState, useEffect } from 'react';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNetInfo } from "@react-native-community/netinfo";

//import from firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

const App = () => {
  // new state that represents network connectivity status
  const connectionStatus = useNetInfo();

  // display an alert popup if the connection is lost
  useEffect(()=>{
    if (connectionStatus.isConnected === false){
      Alert.alert("Connection lost");
    disableNetwork(db)
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db)
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyA1ByDM-RgzwFnhbuSexVeVFWZoGN-tkRI",
    authDomain: "chat-app-a5005.firebaseapp.com",
    projectId: "chat-app-a5005",
    storageBucket: "chat-app-a5005.appspot.com",
    messagingSenderId: "133023026384",
    appId: "1:133023026384:web:2e05256d330f511b5522d5"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig); 

   // Initialize Cloud Firestore and get a reference to the service
   const db = getFirestore(app);


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
        >
           {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}




export default App;