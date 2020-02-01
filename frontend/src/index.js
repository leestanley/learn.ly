import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// TODO: Set up Redux???
import configureStore, { history } from './store';

import HomePage from './containers/HomePage';
import InstructorBegin from './containers/InstructorBegin';
import InstructorPage from './containers/InstructorPage';
import LearnerBegin from './containers/LearnerBegin'

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/ibegin" component={InstructorBegin} />
            <Route exact path="/instructor" component={InstructorPage} />
            <Route exact path="/lbegin" component={LearnerBegin} />
            <Route path="/" component={HomePage} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
