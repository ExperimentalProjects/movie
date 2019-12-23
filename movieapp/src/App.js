import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import Login from './containers/login'
import Home from './containers/home'
import MovieDetail from "./containers/moviedetail";
import Addmovie from "./containers/addMovie";

export default function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route path="/detail">
            <MovieDetail />
          </Route>
          <Route path="/add">
            <Addmovie />
          </Route>
          <Route path="/dashboard">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </Provider>
  );
}
