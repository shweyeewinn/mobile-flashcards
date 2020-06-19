import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import {
  white,
  gray,
  purple,
  red,
  green,
  black,
  lightPurp,
} from '../utils/colors';
import CardFlip from 'react-native-card-flip';
import TextButton from './TextButton';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { clearLocalNotification, setLocalNotification } from '../utils/api';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      count: 0,
      correctAnswers: 0,
      disabledShowAnswer: true,
      disabledButtons: false,
      disabledNextButton: true,
    };
  }

  handlePress = (answer) => {
    this.setState((state) => {
      return {
        correctAnswers: answer
          ? state.correctAnswers + 1
          : state.correctAnswers,
        disabledShowAnswer: false,
        disabledButtons: true,
        disabledNextButton: false,
      };
    });
  };

  nextQuestion = () => {
    const totalQuestion = this.props.deck.questions.length;

    this.setState((state) => {
      return {
        currentIndex:
          state.currentIndex >= totalQuestion - 1 ? 0 : state.currentIndex + 1,
        count: state.count + 1,
        disabledShowAnswer: true,
        disabledButtons: false,
        disabledNextButton: true,
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const totalQuestion = this.props.deck.questions.length;
    const { navigation } = this.props;

    if (prevState.currentIndex !== this.state.currentIndex) {
      if (this.state.count >= totalQuestion) {
        navigation.navigate('Score', {
          id: this.props.deck.id,
          correctAnswers: this.state.correctAnswers,
          totalQuestion,
        });
        this.setState({
          currentIndex: 0,
          count: 0,
          correctAnswers: 0,
        });
        clearLocalNotification().then(setLocalNotification);
      }
    }
  }
  render() {
    const { title, questions } = this.props.deck;
    const totalQuestion = questions.length;
    const {
      currentIndex,
      disabledShowAnswer,
      disabledButtons,
      disabledNextButton,
    } = this.state;

    return (
      <>
        {questions.length > 0 ? (
          <View style={styles.container}>
            <View style={[styles.center, { justifyContent: 'flex-start' }]}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.cardDesc}>
                {currentIndex + 1} of {totalQuestion} questions
              </Text>
              <CardFlip
                style={styles.cardContainer}
                ref={(card) => (this.card = card)}
                key={currentIndex}
              >
                <View>
                  <Text style={styles.question}>
                    {questions[currentIndex].question}
                  </Text>
                  <TextButton
                    style={[
                      styles.flipBtnText,
                      { color: disabledShowAnswer ? gray : red },
                    ]}
                    onPress={() => this.card.flip()}
                    disabled={disabledShowAnswer}
                  >
                    Show Answer
                  </TextButton>
                </View>

                <View>
                  <Text style={styles.question}>
                    {questions[currentIndex].answer}
                  </Text>
                  <TextButton
                    style={[styles.flipBtnText, { color: red }]}
                    onPress={() => this.card.flip()}
                    disabled={disabledShowAnswer}
                  >
                    Show Question
                  </TextButton>
                </View>
              </CardFlip>
            </View>

            <View style={[styles.center, { justifyContent: 'center' }]}>
              {/* Correct Button */}
              <View style={{ marginBottom: 20 }}>
                <TouchableOpacity
                  style={
                    Platform.OS === 'ios'
                      ? [
                          styles.iosButton,
                          {
                            backgroundColor: disabledButtons ? gray : green,
                            borderColor: black,
                          },
                        ]
                      : [
                          styles.androidButton,
                          {
                            backgroundColor: disabledButtons ? gray : green,
                            borderColor: black,
                          },
                        ]
                  }
                  onPress={() => this.handlePress(true)}
                  disabled={disabledButtons}
                >
                  <Text style={[styles.btnText, { color: white }]}>
                    Correct
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Correct Button */}

              {/* InCorrect Button */}
              <View style={{ marginBottom: 40 }}>
                <TouchableOpacity
                  style={
                    Platform.OS === 'ios'
                      ? [
                          styles.iosButton,
                          {
                            backgroundColor: disabledButtons ? gray : red,
                            borderColor: black,
                          },
                        ]
                      : [
                          styles.androidButton,
                          {
                            backgroundColor: disabledButtons ? gray : red,
                            borderColor: black,
                          },
                        ]
                  }
                  onPress={() => this.handlePress(false)}
                  disabled={disabledButtons}
                >
                  <Text style={[styles.btnText, { color: white }]}>
                    Incorrect
                  </Text>
                </TouchableOpacity>
              </View>
              {/* InCorrect Button */}

              {/* Next Button */}
              <View>
                <TextButton
                  style={[
                    styles.nextBtnText,
                    { color: disabledNextButton ? gray : red },
                  ]}
                  onPress={() => this.nextQuestion()}
                  disabled={disabledNextButton}
                >
                  Next{'   '}
                  <Ionicons
                    name='ios-arrow-forward'
                    size={18}
                    color={disabledNextButton ? gray : red}
                    style={{
                      fontFamily: 'OpenSans-Bold',
                    }}
                  />
                </TextButton>
              </View>
              {/* Next Button */}
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <View
              style={[
                styles.center,
                { justifyContent: 'center', alignItems: 'center' },
              ]}
            >
              <Text style={styles.cardTitle}>
                Sorry, you can't take a quiz because there are no cards in the
                deck.
              </Text>
            </View>
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  return { deck: decks.deckDetails };
};

export default connect(mapStateToProps, null)(Quiz);

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
    marginBottom: 20,
  },
  question: {
    fontSize: 22,
    paddingBottom: 20,
    color: black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
  },
  cardContainer: {
    flex: 2,
  },
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
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  flipBtnText: {
    // color: red,
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20,
    fontFamily: 'OpenSans-Regular',
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
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
  },
  center: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  nextBtnText: {
    // color: red,
    fontSize: 18,
    textAlign: 'right',
    paddingTop: 20,
    fontFamily: 'OpenSans-Regular',
  },
});
