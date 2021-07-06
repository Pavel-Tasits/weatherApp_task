import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import GlobalStyle from '../../global-styles';

import HomePage from '../HomePage';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);
ProtectedRoute.propTypes = {
  component: PropTypes.any,
};

export default function App() {
  return (
    <div id="dApp">
      <Switch>
        <ProtectedRoute path="/" component={HomePage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
