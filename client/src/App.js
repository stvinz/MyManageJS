import React, { useEffect } from 'react';
import { BrowserRouter as Route, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Header, Footer } from './components';
import { Home, Kontra } from './scenes';
import { refresh } from './slices/notaSlices';

const useStyles = makeStyles({
  container: {
    minWidth: '95%',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
});

function App() {
  const classes = useStyles();

  useEffect(() => {
    refresh();
  });

  return (
    <div className="App">
      <Header />
      <Container className={classes.container}>
        <Switch>
          <Route exact path="/login">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/kontra">
            <Kontra />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
