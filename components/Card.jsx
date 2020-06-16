import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { white, gray } from '../utils/colors';

const Card = ({ card }) => {
  const navigation = useNavigation();
  const { id, question, answer } = card;
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        // onPress={() =>
        //   navigation.navigate('DeckDetail', {
        //     id,
        //     title,
        //     questions,
        //   })
        // }
      >
        <View>
          <Text style={styles.cardTitle}>{question}</Text>
          <Text style={styles.cardDesc}>{answer}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 18,
    marginVertical: 10,
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardTitle: {
    fontSize: 30,
    paddingBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // fontFamily: 'Poppins_400Regular',
  },
  cardDesc: {
    fontSize: 16,
    color: gray,
    textAlign: 'center',
    // fontFamily: 'Poppins_400Regular',
  },
});
