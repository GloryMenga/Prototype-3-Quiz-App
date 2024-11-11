import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

export default function Home() {

  const styles = StyleSheet.create({
    title:{
      color: 'white',
      fontSize: 28,
    },
    start:{
      justifyContent: 'center',
      backgroundColor: '#CDA5F2',
      borderRadius: 15,
      borderWidth: 0,
      marginTop: 30,
      color: 'white',
      fontSize: 40,
      width: 150,
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
      <Text style={styles.title}>Voer jouw code in:</Text>
      <TextInput 
      style={styles.input} 
      placeholder='Code'
      keyboardType="number-pad"
      />
      <View style={styles.start}>
        <Button
          title="START"
          color="CDA5F2"
          onPress={() => { /* Add your button logic here */ }}
        />
      </View>
    </View>
  );
}

