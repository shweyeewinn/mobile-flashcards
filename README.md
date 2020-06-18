# Mobile Flashcards Project

This is a mobile (iOS) application that allows users to study collections of flashcards.
The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

In this application, users will be able to

- create a deck which can hold an unlimited number of cards.
- add a card to a specific deck.
- flip the card to view the question in the front of the card and the answer in the back of the card.
- quiz themselves on a specific deck and receive a score once they're done.
- Users should receive a notification to remind themselves to study if they haven't already for that day.

## Demo

Project Demo can be viewed [here](https://www.loom.com/share/713c979fdd204f97bc28fa40c9118347).

## Installation

Install all project dependencies with `yarn install`.
Start the development server `yarn start`.
Run the application in web browser `yarn web`.
Run the application in ios simulator `yarn ios`.

## Author

- [Shwe Yee Winn](https://www.linkedin.com/in/shweyeewinn/) - Frontend Engineer

## Tech Stack

- HTML5
- CSS3
- [react 16.9.0](https://reactjs.org/)
- [redux ^4.0.5](https://www.npmjs.com/package/redux)
- [react-redux ^7.2.0](https://www.npmjs.com/package/react-redux)
- [redux-thunk ^2.3.0](https://www.npmjs.com/package/redux-thunk)
- [react-native-card-flip](https://www.npmjs.com/package/react-native-card-flip)
- [expo ^37.0.0](https://www.npmjs.com/package/expo)

## App Functionality

### Deck List View (Default View)

The primary view, seen when the app loads, is a list of created decks which includes:

- the name of each deck and
- the number of cards in each deck.

### Individual Deck View

The Individual Deck view includes:

- The deck title
- Number of cards in the deck
- Option to start a quiz for that deck
- Option to add a new question to the deck

### Quiz View

- The Quiz view starts with a card question from the selected deck.
- The question is displayed, along with a button to show the answer.
- Pressing the 'Show Answer' button displays the answer.
- Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
- The view displays the number of questions remaining in the quiz.
- When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
- When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
- Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.

### New Deck View

- The New Deck view includes a form for creating a new deck - which are an input for the title and a 'Create Deck' button.
- Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.

### New Question View

- The New Question view includes a form with fields for a question and answer, and a submit button.
- Submitting the form correctly adds the question to the deck.

### Notification

- Notifications are generated at a specific time if the user hasn't completed at least one quiz for that day.

## Backend

- In this project, I used AsyncStorage to store the decks and flashcards.

## Contribution

This repository is my final assessment project for Udacity's React Native course. Therefore, I most likely will not accept pull requests.
