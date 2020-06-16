import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { white, gray, purple, red, black, lightPurp } from '../utils/colors';
import TextButton from './TextButton';
import { connect } from 'react-redux';
import { fetchDeckAction, removeDeckAction } from '../actions';

import { HeaderBackButton, StackActions } from '@react-navigation/native';
import { NavigationActions } from '@react-navigation/native';

class DeckDetail extends Component {
  setTitle = (title) => {
    const deckTitle = title;
    this.props.navigation.setOptions({
      title: deckTitle,
    });
  };

  componentDidMount() {
    const {
      params: { id },
    } = this.props.route;
    this.props.fetchDeckAction(id);
  }

  deleteDeck = (id) => {
    this.props.removeDeckAction(id);

    //Route to Deck List Screen
    console.log('Here =>', this.props);

    this.props.navigation.navigate('TabNav', { screen: 'DeckList' });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { deck } = this.props;
    this.setTitle(deck.title);
    return (
      <View style={styles.container}>
        <View style={[styles.center, { justifyContent: 'flex-start' }]}>
          <Text style={styles.cardTitle}>{deck?.title}</Text>
          <Text style={styles.cardDesc}>{deck?.questions?.length} cards</Text>
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
              onPress={() => navigate('AddCard', { id: deck?.id })}
            >
              <Text style={[styles.btnText, { color: black }]}>Add Card</Text>
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
              onPress={() => navigate('Quiz', { id: deck?.id })}
            >
              <Text style={[styles.btnText, { color: white }]}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
          <TextButton
            style={styles.deleteBtnText}
            onPress={() => this.deleteDeck(deck.id)}
          >
            Delete Deck
          </TextButton>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  return { deck: decks.deckDetails };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDeckAction: (id) => dispatch(fetchDeckAction(id)),
  removeDeckAction: (id) => dispatch(removeDeckAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);

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
    // fontFamily: 'Poppins_400Regular',
  },
  cardDesc: {
    fontSize: 16,
    paddingBottom: 20,
    color: gray,
    textAlign: 'center',
    // fontFamily: 'Poppins_400Regular',
  },
  deleteBtnText: {
    color: red,
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20,
    // fontFamily: 'Poppins_400Regular',
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
    // fontFamily: 'Poppins_400Regular',
  },
  center: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});
