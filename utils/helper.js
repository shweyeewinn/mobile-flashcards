import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'


const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
})

export function getDecks() {
  const decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  return decks
}


export const DECK_STORAGE_KEY = 'FlashCards:deck'

export async function fetchDeckResults() {
  let result = await AsyncStorage.getItem(DECK_STORAGE_KEY)
  return result;
}