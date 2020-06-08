import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';

import { connect } from 'react-redux';
import { getInitialData } from '../actions/index';
import Deck from './Deck';
import { FlatList } from 'react-native-gesture-handler';
import {white} from '../utils/colors'

class DeckList extends Component {
  componentDidMount() {
    this.props.getInitialData();
  }

  render() {
    const { decks } = this.props;
    return (
      <>
        { decks ?
          <SafeAreaView style={styles.container}>
            <FlatList
              data={decks}
              renderItem={({ item }) => <Deck title={item.title} questions={item.questions}/>}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
          : <View style={styles.container}>
            <Text style={styles.noDataText}>
              No decks
            </Text>
        </View>
        }
      </>
    );
  }
}

const mapStateToProps = ({ decks }) => ({
  decks,
});

const mapDispatchToProps = (dispatch) => ({
  getInitialData: () => dispatch(getInitialData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
})