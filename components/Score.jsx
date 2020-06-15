import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { white, gray, purple, red, black, lightPurp } from '../utils/colors';

const Score = (props) => {
  const { navigation } = props;
  const { id, correctAnswers, totalQuestion } = props.route.params;
  const score = (correctAnswers / totalQuestion) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.center, { justifyContent: 'flex-start' }]}>
        <Text style={styles.cardTitle}>Score</Text>
        <Text style={styles.cardDesc}>{score} %</Text>
      </View>
      <View style={[styles.center, { justifyContent: 'center' }]}>
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            style={
              Platform.OS === 'ios'
                ? [
                    styles.iosButton,
                    { backgroundColor: white, borderColor: black },
                  ]
                : [
                    styles.androidButton,
                    { backgroundColor: white, borderColor: black },
                  ]
            }
            onPress={() => navigation.navigate('DeckDetail', { id })}
          >
            <Text style={[styles.btnText, { color: black }]}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            style={
              Platform.OS === 'ios'
                ? [
                    styles.iosButton,
                    { backgroundColor: black, borderColor: gray },
                  ]
                : [
                    styles.androidButton,
                    { backgroundColor: black, borderColor: gray },
                  ]
            }
            onPress={() => navigation.navigate('Quiz', { id })}
          >
            <Text style={[styles.btnText, { color: white }]}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Score;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightPurp,
    justifyContent: 'space-around',
  },
  cardTitle: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  cardDesc: {
    fontSize: 16,
    paddingBottom: 20,
    color: gray,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  deleteBtnText: {
    color: red,
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20,
    fontFamily: 'Poppins_400Regular',
  },
  iosButton: {
    padding: 10,
    borderRadius: 10,
    height: 50,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 1,
  },
  androidButton: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    borderRadius: 4,
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  center: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});
