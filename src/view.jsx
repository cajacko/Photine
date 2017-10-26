import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import getStore from 'store/configureStore';
import FramiumView from 'components/FramiumView/FramiumView.container';
import HomeView from 'components/HomeView/HomeView.render';
import FourOhFourView from 'components/FourOhFourView/FourOhFourView.render';

ReactDOM.render(
  <Provider store={getStore()}>
    <Router>
      <Switch>
        <Route path="/" exact component={HomeView} />
        <Route path="/framium" exact component={FramiumView} />
        <Route component={FourOhFourView} />
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#App')
);
