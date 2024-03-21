import {StyleSheet, View, Text} from 'react-native';
import { useEffect } from 'react';

const Chat = ({route, navigation}) => {
    const {name} = route.params;
    const {color} = route.params;

    useEffect(()=>{
        navigation.setOptions({title: name});
    }, []);
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color} }>
            <Text>Chat Screen</Text>
        </View>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
        
//     }
// })

export default Chat;