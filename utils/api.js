import { AsyncStorage } from 'react-native';
import { getAllDecks, getNewDeck, getNewCard } from './_DATA';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const DECKS_STORAGE_KEY = 'flashcards:decks';
export const NOTIFICATION_KEY = 'flashcards:notifications';

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

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: 'Complete a quiz!',
    body: "👋 don't forget to complete a quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          console.log('status', status);
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day',
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
