let decks = [
  {
    id: 'loxhs1bqm25b708cmbf3g',
    title: 'React',
    questions: [
      {
        id: '8xf0y6ziyjabvozdd253nd',
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        id: '6ni6ok3ym7mf1p33lnez',
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  {
    id: 'vthrdm985a262al8qx3do',
    title: 'JavaScript',
    questions: [
      {
        id: 'am8ehyc8byjqgar0jgpub9',
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
];

function generateId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function getAllDecks() {
  return new Promise((res, _rej) => {
    setTimeout(() => res(decks), 1000);
  });
}

function formatDeck(title) {
  return {
    id: generateId(),
    title,
    questions: [],
  };
}

export function getNewDeck(deckTitle) {
  return new Promise((res, _rej) => {
    const formattedDeck = formatDeck(deckTitle);
    setTimeout(() => {
      // decks.push(formattedDeck);
      res(formattedDeck);
    }, 1000);
  });
}

function formatQuestion(question, answer) {
  return {
    id: generateId(),
    question,
    answer,
  };
}

export function getNewCard(question, answer) {
  return new Promise((res, _rej) => {
    const formattedCard = formatQuestion(question, answer);
    setTimeout(() => {
      res(formattedCard);
    }, 1000);
  });
}

// export function saveCard(deckId, question, answer) {
//   return new Promise((res) => {
//     const formattedQuestion = formatQuestion(question, answer);
//     setTimeout(() => {
//       const deck = decks.find((deck) => deck.id === deckId);
//       deck.questions.push(formattedQuestion);
//       res(decks);
//     }, 500);
//   });
// }