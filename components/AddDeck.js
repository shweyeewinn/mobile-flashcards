import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { white, gray, purple, black, lightPurp } from '../utils/colors';
import { saveDeckAction } from '../actions';
import { CommonActions } from '@react-navigation/native';

class AddDeck extends Component {
  state = {
    title: '',
  };

  onChangeText = (text) => {
    this.setState({ title: text });
  };

  saveDeck = async () => {
    const deckId = await this.props.saveDeckAction(this.state.title);

    // Route to Individual Deck Screen
    this.props.navigation.navigate('DeckDetail', {
      id: deckId,
      title: this.state.title,
    });

    this.setState({ title: '' });
  };

  toHome = () => {};

  render() {
    const { title } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={[styles.center, { justifyContent: 'flex-start' }]}>
          <Text style={styles.cardTitle}>
            What is the title of your new deck?
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              color: black,
            }}
            onChangeText={(text) => this.onChangeText(text)}
            value={title}
            placeholder='Fill in the title of deck'
          />
        </View>
        <View style={[styles.center, { justifyContent: 'flex-start' }]}>
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
            onPress={this.saveDeck}
            disabled={title === ''}
          >
            <Text style={[styles.btnText, { color: white }]}>Create Deck</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveDeckAction: (title) => dispatch(saveDeckAction(title)),
});

export default connect(null, mapDispatchToProps)(AddDeck);

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
    fontFamily: 'OpenSans-Bold',
  },
  cardDesc: {
    fontSize: 16,
    paddingBottom: 20,
    color: gray,
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  center: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
  },
});
