import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';  

export default function RolePicking() {
  const router = useRouter();  

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CDA5F2',
      height: '100%',
    },
    text: {
      fontSize: 24,
      fontWeight: '800',
      color: 'white',
    },
    btns: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: 40,
      width: '65%',
    },
    quizmaster: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#f4a5b0',
      borderRadius: 10,
      padding: 10,
    },
    player: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#a5cbf4',
      borderRadius: 10,
      padding: 10,
    },
    q: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 20,
      letterSpacing: 1,
    },
    p: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
      letterSpacing: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose your role:</Text>
      <View style={styles.btns}>
        <Pressable
          style={styles.quizmaster}
          onPress={() => router.push('./WaitingForPlayer')}
        >
          <Text style={styles.q}>Quizmaster</Text>
        </Pressable>

        <Pressable
          style={styles.player}
          onPress={() => router.push('./WaitingForQuizmaster')} 
        >
          <Text style={styles.p}>Player</Text>
        </Pressable>
      </View>
    </View>
  );
}
