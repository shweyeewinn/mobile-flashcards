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
import { CommonActions } from '@react-navigation/native';
import { fetchDeckAction, removeDeckAction } from '../actions';
import { FlatList } from 'react-native-gesture-handler';
import Card from './Card';

class DeckDetail extends Component {
  setTitle = () => {
    const { navigation, route } = this.props;
    const deckTitle = route.params.title;
    // console.log('HHH ', route.params.title);
    navigation.setOptions({
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

    //Route to DeckList View (DECKS)
    // this.toHome();
    console.log('Here =>', this.props);
    this.props.navigation.goBack();
  };

  // toHome = () => {
  //   this.props.navigation.dispatch(
  //     CommonActions.goBack({
  //       key: 'Decks',
  //     })
  //   );
  // };

  render() {
    this.setTitle();
    console.log('this.props', this.props);
    const { navigate } = this.props.navigation;

    const { deck } = this.props;

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
