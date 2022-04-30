import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Home from "./Components/Home";
import Login from "./auth/Login";
import { isAutheticated } from './auth/helper/authapicalls'
import Signup from "./auth/Signup";
import NavBar from "./Components/Navbar";
import Tags from "./Components/Tags";
import AskQuestion from "./Components/AskQuestion";
import Users from "./Components/Users";
import QuestionOverview from "./Components/QuestionOverview";
function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            {true ? <Home /> : <Redirect to={{
              pathname: "/login"
            }}
            />}
          </Route>
          <Route exact
            path="/login">
            <Login />
          </Route>
          <Route exact
            path="/signup">
            <Signup />
          </Route>
          <Route exact 
        path="/navbar">
          <NavBar />
        </Route>
        <Route exact 
        path="/tags">
          <Tags />
        </Route>
        <Route exact 
        path="/users">
          <Users />
        </Route>
        <Route exact 
        path="/companies">
          <Tags />
        </Route>
        <Route exact 
        path="/question/ask">
          <AskQuestion />
        </Route>
        <Route exact 
        path="/questionOverview">
          <QuestionOverview />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
