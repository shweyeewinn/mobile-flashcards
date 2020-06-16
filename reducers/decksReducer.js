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
      console.log('action.decks ', action.decks);
      console.log('state.allDecks ', state.allDecks);
      return {
        // allDecks: [...action.decks],
        allDecks:
          state.allDecks.length === 0 ? [...action.decks] : [...state.allDecks],
        deckDetails: {},
      };

    case SAVE_DECK:
      return {
        // ...state,
        allDecks: [...state.allDecks, action.deck],
        deckDetails: action.deck,
      };

    case REMOVE_DECK:
      return {
        // ...state,
        allDecks: [...state.allDecks.filter((deck) => deck.id !== action.id)],
        deckDetails: {},
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
