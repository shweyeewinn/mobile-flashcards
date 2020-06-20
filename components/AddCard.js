import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';

import { saveCardToDeckAction } from '../actions';

import { white, gray, purple, black, lightPurp } from '../utils/colors';

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
    };
  }

  onChangeQuestion = (text) => this.setState({ question: text });

  onChangeAnswer = (text) => this.setState({ answer: text });

  handleSubmit = async () => {
    const { id, title } = this.props.route.params;
    await this.props.saveCardToDeckAction(
      id,
      this.state.question,
      this.state.answer
    );

    // Route to Individual Deck Screen
    this.props.navigation.push('DeckDetail', {
      id,
      title,
    });

    this.setState({
      question: '',
      answer: '',
    });
  };

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={[styles.center, { justifyContent: 'flex-start' }]}>
          <Text style={styles.cardTitle}>
            What are the question and answer of your new card?
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              color: black,
            }}
            onChangeText={(text) => this.onChangeQuestion(text)}
            value={question}
            placeholder='Fill in the question'
          />
          <View style={{ marginBottom: 30 }} />
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              color: black,
            }}
            onChangeText={(text) => this.onChangeAnswer(text)}
            value={answer}
            placeholder='Fill in the answer'
          />
        </View>
        <View style={[styles.center, { justifyContent: 'center' }]}>
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
            onPress={this.handleSubmit}
            disabled={question === '' || answer === ''}
          >
            <Text style={[styles.btnText, { color: white }]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCardToDeckAction: (id, question, answer) =>
    dispatch(saveCardToDeckAction(id, question, answer)),
});

export default connect(null, mapDispatchToProps)(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightPurp,
    justifyContent: 'space-around',
  },
  cardTitle: {
    fontSize: 20,
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
