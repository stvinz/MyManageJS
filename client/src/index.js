import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './theme';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/">
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
