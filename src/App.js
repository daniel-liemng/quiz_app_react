import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/quiz' component={Quiz}></Route>
      </Switch>
    </Router>
  );
};

export default App;
