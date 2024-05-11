# CATLAS

CATLAS is a single-page app that allows users to search for cat images by breed using [The Cat API](https://thecatapi.com/). The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Live App

The app is deployed on GitHub pages and can be accessed here: https://liezlsantos.github.io/catlas/.

## Getting Started

### Prerequisites

- Node.js ^20

### Starting the development server

#### Setting up environment variables

Copy `.env.example` to `.env`. Update the file accordingly:

**[Option 1] Connect the app directly to The CAT API**

```
REACT_APP_CAT_API_BASE_URL="https://api.thecatapi.com/v1"
REACT_APP_CAT_API_KEY={valid API KEY}
```

On dev mode, you can provide a valid API key retrieved from [The Cat API](https://thecatapi.com/) to
connect directly to https://api.thecatapi.com/v1. However, this will expose your API key to the client so must only be done on development mode. If you don't provide a valid key, the app will still work but can only display up to 10 images at random.

**[Option 2] Run the proxy service**
Otherwise, you can run the proxy service at [CATLAS API](https://github.com/liezlsantos/catlas-api).
By default the proxy runs on http://localhost:3001 so no changes for `.env` file is required.

#### Steps

1. Run `npm install` to install dependencies.
2. Run `npm start`. This will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it on the browser.

### Other Available Scripts

#### `npm run format`

Format files using `prettier`.

#### `npm run build`

Builds the app for production to the `build` folder.

## Deployment

App is deployed on GitHub pages using GitHub Actions. Pushing to `main` branch
will automatically trigger a deployment.
