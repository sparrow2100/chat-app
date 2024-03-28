import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import {AsyncStorage} from "@react-native-async-storage/async-storage";

import { collection, orderBy, addDoc, onSnapshot, query } from "firebase/firestore";

const Chat = ({route, navigation, db, isConnected}) => {
    const [messages, setMessages] = useState([]);
   
    useEffect(()=>{
      let unsubscribeMessages;
      if (isConnected === true) {

        //unregister current onSnapshot listener to avoid registering multiple listeners when useEffect code is re-executed
        if (unsubscribeMessages) unsubscribeMessages();
        unsubscribeMessages = null;


        navigation.setOptions({title: route.params.name});
        unsubscribeMessages = onSnapshot(query(collection(db, "messages"), orderBy("createdAt", "desc")),  (documentSnapshot) => {
          let newMessages = [];
          documentSnapshot.forEach(doc =>{
            const docData = doc.data();
            console.log(docData.createdAt);
            const createdAtDate = new Date(docData.createdAt.seconds + (docData.createdAt.nanoseconds / 1000));
            newMessages.push({id: doc.id, ...docData, createdAt: createdAtDate });
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        });
      } else loadCachedMessages();
        //clean up code
        return () => {
          if (unsubscribeMessages) unsubscribeMessages();
        }
        
    }, [isConnected]);

    const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem("messages") || [];
      setMessages(JSON.parse(cachedMessages))
    }

    const cacheMessages = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
      } catch (error) {
        console.log(error.message);
      }
    }

    //new message gets appended to the existing messages, to be displayed in the chat
    const onSend = (newMessages) => {
        // setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
        addDoc(collection(db, "messages"), newMessages[0])
      }

    //change the color of the text bubbles
    const renderBubble = (props) => {
        return <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000"
            },
            left: {
              backgroundColor: "#FFF"
            }
          }}
        />
      }

      const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
       }
      
    return(
        <View style={{flex: 1, backgroundColor: route.params.color} }>
            <Text style={{alignSelf: 'center'}} >Chat Screen</Text>
            <GiftedChat
                 messages={messages}
                 renderBubble={renderBubble}
                  onSend={messages => onSend(messages)}
                  renderInputToolbar={renderInputToolbar}
                 user={{
                  _id: route.params.userID,
                  name: route.params.name,
                  
                }}
              />
              
            {/* Make sure the keyboard doesn't cover the input field on android */}
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height'/> : null}
        </View>
        
    )
}



export default Chat;