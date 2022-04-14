import React from "react";
import './App.css';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom"
import Home from "./Components/Home";
import Login from "./Components/Login";
function App() {
  return (
   <Router>
     <Switch>
      <Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact 
        path="/login">
          <Login />
        </Route>
      </Route>
     </Switch>
   </Router>
  );
}

export default App;
