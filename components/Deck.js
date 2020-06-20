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

const Deck = ({ deck }) => {
  const navigation = useNavigation();
  const { title, questions, id } = deck;
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() =>
          navigation.navigate('DeckDetail', {
            id,
            title,
          })
        }
      >
        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDesc}>
            {questions && questions.length}{' '}
            {questions.length > 1 ? 'Cards' : 'Card'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Deck;

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
    fontFamily: 'OpenSans-Bold',
  },
  cardDesc: {
    fontSize: 16,
    color: gray,
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
  },
});
