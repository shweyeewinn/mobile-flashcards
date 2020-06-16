import {
  GET_DECK,
  GET_ALL_DECKS,
  SAVE_DECK,
  REMOVE_DECK,
  ADD_CARD_TO_DECK,
} from '../types';

const initialState = {
  allDecks: [],
  deckDetails: {},
};

function decksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DECK:
      return {
        ...state,
        deckDetails: action.deck,
      };

    case GET_ALL_DECKS:
      return {
        ...state,
        allDecks: [...action.decks],
      };

    case SAVE_DECK:
      return {
        ...state,
        deckDetails: action.deck,
      };

    case REMOVE_DECK:
      return {
        ...state,
        allDecks: [...state.allDecks.filter((deck) => deck.id !== action.id)],
      };

    case ADD_CARD_TO_DECK:
      const deck = state.allDecks.find(
        (deck) => deck.id === action.payload.deckId
      );
      deck.questions.push(action.payload.card);
      return {
        allDecks: [...state.allDecks],
        deckDetails: { ...deck },
      };

    default:
      return state;
  }
}
export default decksReducer;
