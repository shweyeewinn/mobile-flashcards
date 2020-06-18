let decks = [
  {
    id: 'loxhs1bqm25b708cmbf3g',
    title: 'Frontend',
    questions: [
      {
        id: '8xf0y6ziyjabvozdd253nd',
        question: 'What is HTML5?',
        answer:
          'HTML5 is the latest version of Hypertext Markup Language, the code that describes web pages.',
      },
      {
        id: '6ni6ok3ym7mf1p33lnez',
        question: 'What is CSS3?',
        answer:
          'CSS3 is the latest evolution of the Cascading Style Sheets language and aims at extending CSS2.1.',
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
