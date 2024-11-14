import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {

  const router = useRouter();

  const styles = StyleSheet.create({
    title:{
      color: 'white',
      fontSize: 28,
    },
    join:{
      justifyContent: 'center',
      backgroundColor: '#CDA5F2',
      borderRadius: 15,
      borderWidth: 0,
      marginTop: 30,
      color: 'white',
      fontSize: 40,
      width: 200,
      height: 50
    },
    create:{
      justifyContent: 'center',
      backgroundColor: '#A5B5F3',
      borderRadius: 15,
      borderWidth: 0,
      marginTop: 30,
      color: 'white',
      fontSize: 40,
      width: 200,
      height: 50
    },
    input:{
      backgroundColor:'#F2E4FF',
      marginTop: 30,
      width: 300,
      height: 50,
      textAlign: 'center',
    },
  });

  return (
     <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={styles.title}>Fill in the code:</Text>
      <TextInput 
        style={styles.input} 
        placeholder='Code'
      />
      <View style={styles.create}>
        <Button
          title="CREATE A ROOM"
          color="A5B5F3"
          onPress={() => router.push('./pages/CreateRoom')} 
        />
      </View>
      <View style={styles.join}>
        <Button
          title="JOIN A ROOM"
          color="CDA5F2"
          onPress={() => router.push('./pages/RolePicking')} 
        />
      </View>
    </View>
  );
}