import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CreateRoom() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Room Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A5B5F3',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});
