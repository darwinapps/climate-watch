import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import store from 'app/store';
import Page from 'app/page';
import routes from 'app/routes';

const history = createBrowserHistory();

const App = ({ data }) =>
  (<Provider store={store(data)}>
    <Router history={history}>
      <Page>
        <Switch>
          {routes.map(route => <Route key={route.path} {...route} />)}
          <Redirect to="/error-page" push />
        </Switch>
      </Page>
    </Router>
  </Provider>);

App.propTypes = {
  data: PropTypes.object
};

export default App;
