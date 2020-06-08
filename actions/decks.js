import { GET_ALL_DECKS, ADD_DECK } from '../types';

export function getAllDecks(decks) {
  return {
    type: GET_ALL_DECKS,
    decks,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}
