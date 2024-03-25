import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({route, navigation}) => {
    const {name} = route.params;
    const {color} = route.params;

    const [messages, setMessages] = useState([]);
   

   
    useEffect(()=>{
        navigation.setOptions({title: name});
        // two static messages that will be displayed once the user enters the chat
        setMessages([
            {
                _id: 1,
                text: 'You have entered the chat',
                createdAt: new Date(),
                system: true,
              },
            {
              _id: 2,
              text: "Hello developer",
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "React Native",
                avatar: "https://placeimg.com/140/140/any",
              },
            },
            
          ]);
        
    }, []);

    //new message gets appended to the existing messages, to be displayed in the chat
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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

    return(
        <View style={{flex: 1, backgroundColor: color} }>
            <Text style={{alignSelf: 'center'}} >Chat Screen</Text>
            <GiftedChat
                 messages={messages}
                 renderBubble={renderBubble}
                  onSend={messages => onSend(messages)}
                 user={{
                  _id: 1
                }}
              
            />
            {/* Make sure the keyboard doesn't cover the input field on android */}
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height'/> : null}
        </View>
        
    )
}



export default Chat;