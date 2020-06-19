let decks = [
  {
    id: 'loxhs1bqm25b708cmbf3g',
    title: 'Frontend',
    questions: [
      {
        id: '8xf0y6ziyjabvozdd253nd',
        question: 'Is HTML5 the latest version of Hypertext Markup Language?',
        answer: 'YES',
      },
      {
        id: '6ni6ok3ym7mf1p33lnez',
        question:
          'Is CSS3 the latest evolution of the Cascading Style Sheets language and aims at extending CSS2.1?',
        answer: 'YES',
      },
    ],
  },
  {
    id: 'vthrdm985a262al8qx3do',
    title: 'JavaScript',
    questions: [
      {
        id: 'am8ehyc8byjqgar0jgpub9',
        question:
          'Is Javascript Closure the combination of a function and the lexical environment within which that function was declared?',
        answer: 'YES',
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
