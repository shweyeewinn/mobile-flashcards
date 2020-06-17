# Mobile Flashcards Project

This is a web app that lets a user play the “Would You Rather?” game.
The game goes like this: A user is asked a question in the form: “Would you rather [option A] or [option B] ?”. Answering "neither" or "both" is against the rules.

In this app, users will be able to

- answer questions,
- see which questions they haven’t answered,
- see how other people have voted,
- post questions, and
- see the ranking of users on the leaderboard.

## Demo

Project Demo can be viewed [here](https://www.loom.com/share/e36d5fd060f0411fac8f5999bc4911bb).

## Installation

Install all project dependencies with `npm install`.
Start the development server `npm start`.

## Author

- [Shwe Yee Winn](https://www.linkedin.com/in/shwe-yee-winn-83146744/) - Frontend Engineer

## Tech Stack

- HTML5
- CSS3
- [react 16.13.1](https://reactjs.org/)
- [redux](https://www.npmjs.com/package/redux)
- [react-redux](https://www.npmjs.com/package/react-redux)
- [redux-thunk](https://www.npmjs.com/package/redux-thunk)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-tabs](https://www.npmjs.com/package/react-tabs)

## App Functionality

### Sign In Page

- For the user to impersonate/ log in as an existing user, there is a login box to select a name from the list of existing users.
- This application allows the user to log out and log back in.
- The user should be logged in to submit new polling questions, vote, and view the leaderboard.
- Once the user logs in, the home page is shown.
- Whenever the user types something in the address bar, the user is asked to log in before the requested page is shown.

### Home Page

- In the homw page, The answered and unanswered questions are displayed.
- The unanswered questions are shown by default.
- The user can alternate between viewing answered and unanswered questions.
- Each polling question resides in the correct category. For example, if a question hasn’t been answered by the current user, it should be in the “Unanswered” category.
- The questions in both categories are arranged from the most recently created (top) to the least recently created (bottom)
- A polling question links to details of that poll.

### Question Page

- When a poll is clicked on the home page, the following is shown:
  - the text “Would You Rather”;
  - the picture of the user who posted the polling question; and
  - the two options.
- For answered questions, each of the two options contains the following:
  - the text of the option;
  - the number of people who voted for that option;
  - the percentage of people who voted for that option.
- The option selected by the logged in user is clearly marked.
- When the user is logged in, the details of the poll are shown. If the user is logged out, he/she is asked to log in before before being able to access the poll.

### Voting mechanism

- Upon voting in a poll, all of the information of the answered poll is displayed.
- The user’s response is recorded and is clearly visible on the poll details page.
- When the user comes back to the home page, the polling question appears in the “Answered” column.

### New Question Page

- In this page, it has a form for user to create a new question which has two options.
- Upon submitting the form, a new poll is created and the user is taken to the home page.
- The new polling question appears in the correct category which is "Unanswered Questions" on the home page.

### Leader Board Page

- Each entry on the leaderboard contains the following:
  - the user’s name;
  - the user’s picture;
  - the number of questions the user asked; and
  - the number of questions the user answered.
  - Users are ordered in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked.

## Backend

The \_DATA.js file is provided by Udacity and it represents a fake database and methods that let access the data.
The data that’s initially displayed is populated from the backend \_DATA.js.
Each user’s answer and each new poll will be recorded on the backend.

## Contribution

This repository is my final assessment project for Udacity's React & Redux course. Therefore, I most likely will not accept pull requests.
