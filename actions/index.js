/* eslint-disable import/prefer-default-export */

// API
import { _getAllDecks } from '../utils/_DATA';

// Action Creator
import { getAllDecks } from './decks';

export const getInitialData = () => async (dispatch) => {
  const decks = await _getAllDecks();
  return dispatch(getAllDecks(decks));
};
