import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';

import Header from './layout/Header';
import LandingPageBox from './landing_page/landingPageBox';
import QuestionBox from './questions/questionBox';
import ReccsBox from './reccs/reccsBox';
import SavedItemsBox from './saved_items/savedItemsBox';
import Login from './accounts/Login';
import Register from './accounts/Register';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { Provider } from 'react-redux';
import store from '../store';
import {loadUser} from '../actions/auth';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={LandingPageBox} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/movies/questions/" render={() => <QuestionBox item_type="movies"/>} />
                  <Route exact path="/movies/reccomendations/" render={() => <ReccsBox />} />
                  <Route exact path="/tv/questions/" render={() => <QuestionBox item_type="tv"/>} />
                  <Route exact path="/tv/reccomendations/" render={() => <ReccsBox />} />
                  <Route exact path="/books/questions/" render={() => <QuestionBox item_type="books"/>} />
                  <Route exact path="/books/reccomendations/" render={() => <ReccsBox />} />
                  <PrivateRoute exact path="/saved_items/" component={SavedItemsBox} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
