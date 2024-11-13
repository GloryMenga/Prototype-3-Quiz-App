import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JoinRoom() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Join Room Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDA5F2',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});
