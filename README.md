# General info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Important Business Logic Notes

1. Maximum Drawdown was calculated using `Adj. Open` and `Adj. Close`
   (I don't know if that is correct, but I assume that because we don't know if `high` and `low` happen in a valid time interval, which comes first)
2. Simple Return was calculated based on `start date` `Adj. Open` and `end date` `Adj. Close`
3. Missing optmization in the autocomplete search field
4. Missing optmization in graphs to display long date range

## Setup

1. `yarn install`
2. Create a `.env.local` in the project root folder with the following code, exchanding `<YOUR_KEY>` by your [quandl](https://www.quandl.com/) api key

```.env.local
REACT_APP_API_BASE_URL="https://www.quandl.com/api/v3/datasets/WIKI/{{ticker}}.json?api_key=<YOUR_KEY>&order=asc"
```

3. `yarn start`
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Run tests

`yarn test`

Tests created to validate the logic used to calculate Maximum Drawdown.
