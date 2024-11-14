import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WaitingForQuizmaster() {

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a5cbf4',
        height: '100%',
    },
    text:{
        color: 'white',
        fontWeight: 600,
        fontSize: 20,
        marginBottom: 20,
    },
    p:{
        color: 'white',
    }
    });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Waiting for a quizmaster</Text>
      <Text style={styles.p}>0/1 Quizmaster</Text>
      <Text style={styles.p}>1/1 player</Text>
      {/* Start Button */}
    </View>
  );
}
