import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlayersWaiting() {

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a55ee5',
        height: '100%',
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
    p:{
        marginTop: 20,
        color: 'white',
        fontWeight: 800

    }
    });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>1 Player remaining . . .</Text>
      {/* Play button for the both players */}
      <Text style={styles.p}> 1/2 players</Text>
    </View>
  );
}
