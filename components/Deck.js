import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform} from 'react-native';
import {white} from '../utils/colors';

const Deck = ({title, questions}) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{questions.length} cards</Text>
    </View>
  </View>
);

export default Deck;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    textAlign: "center",
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 18,
    marginVertical: 10
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },

});
