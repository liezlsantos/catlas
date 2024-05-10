# CATLAS

CATLAS is a single-page app that allows users to search for cat images by breed using [The Cat API](https://thecatapi.com/). The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Live App

The app is deployed on GitHub pages and can be accessed here: https://liezlsantos.github.io/catlas/.

## Getting Started

### Prerequisites

- Node.js ^20

### Starting the development server

1. Copy `.env.example` to `.env` and replace API key with a valid one retrieved from [The Cat API](https://thecatapi.com/).
2. Run `npm install` to install dependencies.
3. Run `npm start`. This will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it on the browser.

### Other Available Scripts

#### `npm run format`

Format files using `prettier`.

#### `npm run build`

Builds the app for production to the `build` folder.

## Deployment

App is deployed on GitHub pages using GitHub Actions. Pushing to `main` branch will automatcially trigger a deployment.
