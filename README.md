## Apeeling Banana
- Apeeling Banana is an application where a user can search for Daily Harvest Ingredients.<br />
- This project is hosted via Github Pages and can be found [here](http://frossi91.github.io/a-peeling-banana)<br />
- It is also mobile responsive so please try it out on iOS/Android!
- The App is bootstrapped with a search value of "Organic Banana" and renders a filtered list of products that contain that ingredient<br />
- After that, the user is free to clear out the input and search for other ingredients<br />
- The search works off an includes, so it supports partial matches. This way a user can search a value such as "Organic" and see all products with "Organic" in the name<br />
- The search is case-insensitive
- The resulting ingredient that triggered a match is bolded to indicate to the user why that specific result was returned in their search <br />
- I also put in a simulated network delay of 150ms, as well as a debounce around the function that performs the search.  This way we can support showing a loading indicator to the user<br />

## Additional Dependencies
- lodash 
  - This is a module that I've found myself using in every javascript/node project.  It is a modern JavaScript utility library that provides functionality such as ```map```, ```reduce```, ```forEach```, ```intersection```, ```filter```, etc.  The aim of this library is performance, modularity & extras (such as ```debounce```!). See lodash.com for more info
- react-grid-system
  - I wanted to make this app mobile responsive, so I decided to bring in a simple row and column system to help lay things out.  Normally, this would be provided from some UI library suite such as Bootstrap.js, but  react-grid-system is much lighter and will suite my needs better for this excerise. See github.com/sealninja/react-grid-system for more info

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run deploy`

Builds the app for production to and deploys it to Github Pages.  For more information see the "deploy" script in package.json

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).