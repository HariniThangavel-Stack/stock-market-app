import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { DashboardComponent } from './containers/dashboard';

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={DashboardComponent}></Route>
        </Switch>
    </Router>
  );
}

export default App;
