import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "../Main";
import Nav from "../Nav";
import Om from "../Pages/About";
import NoMatch from "../Pages/NoMatch";
import SearchNav from "../Pages/SearchNav";

const Routes = () => (
  <Router>
    <Nav />
    <Switch>
      <Route exact path="/Om">
        <Om />
      </Route>
      <Route exact path="/Search">
        <SearchNav />
      </Route>
      <Route exact path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
