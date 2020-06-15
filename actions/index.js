// Types
import {
  GET_DECK,
  GET_ALL_DECKS,
  SAVE_DECK,
  REMOVE_DECK,
  ADD_CARD_TO_DECK,
} from '../types';

import {
  fetchDecks,
  fetchDeck,
  saveDeck,
  removeDeck,
  saveCardToDeck,
} from '../utils/api';

export const fetchAllDecksAction = () => {
  return async (dispatch) => {
    const decks = await fetchDecks();
    dispatch({
      type: GET_ALL_DECKS,
      decks: decks,
    });
  };
};

export const fetchDeckAction = (id) => {
  return async (dispatch) => {
    const deck = await fetchDeck(id);
    dispatch({
      type: GET_DECK,
      deck,
    });
  };
};

export const saveDeckAction = (title) => {
  return async (dispatch) => {
    const deck = await saveDeck(title);
    dispatch({
      type: SAVE_DECK,
      deck,
    });
    return deck.id;
  };
};

export function removeDeckAction(id) {
  return async (dispatch) => {
    await removeDeck(id);
    dispatch({
      type: REMOVE_DECK,
      id,
    });
  };
}

export const saveCardToDeckAction = (deckId, question, answer) => {
  return async (dispatch) => {
    const card = await saveCardToDeck(deckId, question, answer);
    dispatch({
      type: ADD_CARD_TO_DECK,
      payload: {
        deckId,
        card,
      },
    });
  };
};
