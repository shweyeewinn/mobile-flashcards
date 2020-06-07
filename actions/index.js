import { GET_ALL_DECKS, ADD_DECK, GET_DECK, ADD_CARD } from '../types'

export function getAllDecks() {
  return {
    type: GET_ALL_DECKS,
    decks
  }
}
export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

// export function getDeck(decks, id) {
//   return {
//     type: GET_DECK,
//     deck: decks[id]
//   }
// }

// export function addCard(card) {
//   return {
//     type: ADD_CARD,
//     deck
//   }
// }