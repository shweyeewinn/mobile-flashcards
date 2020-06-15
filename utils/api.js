import { AsyncStorage } from 'react-native';
import { getAllDecks, getNewDeck, getNewCard } from './_DATA';

export const DECKS_STORAGE_KEY = 'flashcards:decks';

async function setDummyData() {
  const items = await getAllDecks();
  try {
    const decks = await AsyncStorage.setItem(
      DECKS_STORAGE_KEY,
      JSON.stringify(items)
    );
    return decks;
  } catch (error) {
    return console.log(error.message);
  }
}

export async function fetchDecks() {
  let result = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

  return result ? JSON.parse(result) : setDummyData();
}

export async function fetchDeck(id) {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  return JSON.parse(decks).find((deck) => deck.id === id);
}

export async function saveDeck(title) {
  const deck = await getNewDeck(title);
  const decks = JSON.parse(
    (await AsyncStorage.getItem(DECKS_STORAGE_KEY)) || []
  );
  decks.push(deck);
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  return deck;
}

export async function removeDeck(id) {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

  const filteredDecks = JSON.parse(decks).filter((deck) => deck.id !== id);

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(filteredDecks));
  return;
}

export async function saveCardToDeck(deckId, question, answer) {
  const card = await getNewCard(question, answer);

  let decks = JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY));

  const deck = decks.find((deck) => deck.id === deckId);

  deck.questions.push(card);

  //set to AsyncStorage
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));

  return card;
}
