import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';

import { connect } from 'react-redux';
import { fetchAllDecksAction } from '../actions';

import Deck from './Deck';
import { FlatList } from 'react-native-gesture-handler';
import { white, red, lightPurp } from '../utils/colors';

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchAllDecksAction();
  }

  render() {
    const { decks } = this.props;
    console.log();
    return (
      <>
        {decks.length > 0 ? (
          <SafeAreaView style={styles.container}>
            <FlatList
              data={decks}
              renderItem={({ item }) => <Deck deck={item} />}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        ) : (
          <View style={styles.container}>
            <View style={styles.center}>
              <Text style={styles.cardTitle}>No Decks!</Text>
            </View>
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ decks }) => ({ decks: decks.allDecks });

const mapDispatchToProps = (dispatch) => ({
  fetchAllDecksAction: (decks) => dispatch(fetchAllDecksAction(decks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightPurp,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  cardTitle: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
});
