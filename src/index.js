import React from 'react';
import ReactDOM from 'react-dom';
// import { StateProvider } from './state';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// import * as serviceWorker from './serviceWorker';

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

// const initialState = {timelist: createTimeList(), interval: 15, currSelectedHourItem: null, showMinutes: false};

ReactDOM.render(
  // <StateProvider reducer={appReducer}>
  <Provider store={store} >
    <App />
  </Provider>
  // </StateProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
