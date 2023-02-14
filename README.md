# Synspective Platform-API Demo App

This is a sample react app to demonstrate the use of [Synspective's Platform API](https://app.swaggerhub.com/apis-docs/Synspective/Syns_Platform_API/1.0).

## Features
- Fetch the list of AOI(Area of Interest) 
- Visualize the Map Tiles using the Synspective's Tiles server. 

## Technology
[DECK.GL](https://deck.gl/)

## Setting up

To use this API app you will need the following

- An API token, provided by Synspective
- API url, provided by Synspective
- Tile url, , provided by Synspective
- A mapbox key. Free from a mapbox account. Sign up for free [here](https://www.mapbox.com/)

You can then paste the keys and urls into App.js.

```jsx
//App.js
const SYNS_API_KEY = ''; // Set your sysnpective API key here
const SYNS_TILE_SERVER_URL = ''; //Set your sysnpective title server url here, it should look something like htps://tiles.synspective.io/v2
const SYNS_API_URL = ''; //Set your sysnpective title server url here, it should look something like htps://api.ldm.synspective.io/v2
const MAPBOX_TOKEN = ''; // Set your mapbox token here
```

## Running the example

Install the dependences
`yarn install`

and run the code with
`yarn start`

It will open in the browser at `http://localhost:3000`
