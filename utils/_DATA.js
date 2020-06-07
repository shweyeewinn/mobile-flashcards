let decks = [
  {
    id: "loxhs1bqm25b708cmbf3g",
    title: 'React',
    questions: [
      {
        id: "8xf0y6ziyjabvozdd253nd",
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        id: "6ni6ok3ym7mf1p33lnez",
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  {
    id: "vthrdm985a262al8qx3do",
    title: 'JavaScript',
    questions: [
      {
        id: "am8ehyc8byjqgar0jgpub9",
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
]

function generateDeckId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getAllDecks() {
  return new Promise((res, rej) => {
    setTimeout(() => res(decks), 1000);
  });
}

function formatDeck({ title }) {
  return {
    id: generateDeckId(),
    title,
    questions: [],
  }
}

export function _saveDeck(deck) {
  return new Promise((res, rej) => {
    const formattedDeck = formatDeck(deck);
    setTimeout(() => {
      decks.push(formattedDeck);
      res(formattedDeck);
    }, 1000);
  });
}

function formatQuestion(question, answer) {
  return {
    id: generateDeckId(),
    question,
    answer
  }
}

export function _saveQuestion({ deckid, question, answer }) {
  return new Promise((res, rej) => {
    const formattedQuestion = formatQuestion(question, answer);
    setTimeout(() => {
      decks[deckid].questions.push(formattedQuestion)
      res(decks);
    }, 500);
  });
}