import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

export default function CreateRoom() {
  const [questions, setQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [timeLimit, setTimeLimit] = useState('10 sec');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTimeSelect = (selectedTime) => {
    setTimeLimit(selectedTime);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>How many questions:</Text>
      
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={questions}
          onValueChange={setQuestions}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#FFFFFF"
        />
        <Text style={styles.valueText}>{questions}</Text>
      </View>
      
      <View style={styles.difficulty}>
        <Text style={styles.text}>Select the difficulty:</Text>
        <View style={styles.difficultySelector}>
          <TouchableOpacity 
            style={[
              styles.difficultyOption, 
              difficulty === 'easy' && styles.selected
            ]}
            onPress={() => setDifficulty('easy')}
          >
            <Text style={styles.difficultyText}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.difficultyOption, 
              difficulty === 'medium' && styles.selected
            ]}
            onPress={() => setDifficulty('medium')}
          >
            <Text style={styles.difficultyText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.difficultyOption, 
              difficulty === 'hard' && styles.selected
            ]}
            onPress={() => setDifficulty('hard')}
          >
            <Text style={styles.difficultyText}>Hard</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.time}>
        <Text style={styles.text}>Time Limit per Question:</Text>
        <TouchableOpacity 
          style={styles.dropdownButton} 
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownButtonText}>{timeLimit}</Text>
        </TouchableOpacity>
        {showDropdown && (
          <View style={styles.dropdown}>
            {['10 sec', '15 sec', '20 sec'].map((time) => (
              <TouchableOpacity 
                key={time} 
                style={styles.dropdownItem} 
                onPress={() => handleTimeSelect(time)}
              >
                <Text style={[
                  styles.dropdownItemText, 
                  timeLimit === time && styles.selectedText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 25,
    backgroundColor: '#A45EE5',
  },
  text: {
    fontSize: 22,
    letterSpacing: 2,
    fontWeight: '800',
    color: 'white',
  },
  sliderContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 20,
  },
  slider: {
    width: '80%',
    height: 40,
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  difficulty: {
    marginTop: 50,
  },
  difficultySelector: {
    flexDirection: 'row',
    marginTop: 30,
    borderWidth: 3,
    borderColor: '#FFF',
    borderRadius: 5,
    overflow: 'hidden',
  },
  difficultyOption: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#A45EE5',
  },
  selected: {
    backgroundColor: '#7E3ABD', 
  },
  difficultyText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  time: {
    marginTop: 50,
  },
  dropdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#7E3ABD',
    borderRadius: 5,
    marginTop: 30,
  },
  dropdownButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    fontSize: 18,
    color: '#7E3ABD',
  },
  selectedText: {
    color: '#A45EE5', 
    fontWeight: '600',
  },
});
