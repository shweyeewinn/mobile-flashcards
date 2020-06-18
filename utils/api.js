import { AsyncStorage } from 'react-native';
import { getAllDecks, getNewDeck, getNewCard } from './_DATA';
import { purple } from './colors';

import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
// import * as Notifications from 'expo-notifications';
// import * as Constants from 'expo-constants';

const DECKS_STORAGE_KEY = 'flashcards:decks';
const NOTIFICATION_KEY = 'flashcards:notifications';

function setDummyData(decks) {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}

export async function fetchDecks() {
  let decks = JSON.parse(
    (await AsyncStorage.getItem(DECKS_STORAGE_KEY)) || '[]'
  );
  if (decks.length == 0) {
    const data = await getAllDecks();
    setDummyData(data);
    decks = data;
  }
  return decks;
}

export async function fetchDeck(id) {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  return JSON.parse(decks).find((deck) => deck.id === id);
}

export async function saveDeck(title) {
  const deck = await getNewDeck(title);
  const decks = JSON.parse(
    (await AsyncStorage.getItem(DECKS_STORAGE_KEY)) || '[]'
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

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};

export const setLocalNotification = async () => {
  let data = JSON.parse(await AsyncStorage.getItem(NOTIFICATION_KEY));

  if (data === null) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync();

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(20);
      tomorrow.setMinutes(0);

      Notifications.scheduleLocalNotificationAsync(
        {
          title: 'Remember to complete the quiz!',
          body: "👋 don't forget to complete the quiz for today!",
          ios: {
            sound: true,
          },
          android: {
            // sound: true,
            // priority: 'high',
            sticky: false,
            vibrate: true,
            color: purple,
          },
        },
        {
          time: tomorrow,
          repeat: 'day',
        }
      );
      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    }
  }
};
