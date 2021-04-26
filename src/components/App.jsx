import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import NavBar from "./NavBar.jsx";
import axios from "axios";
import CreateAccount from "./CreateAccount.jsx";
import SearchAndAdd from "./SearchAndAdd.jsx";
import OrderBooks from "./OrderBooks.jsx"
import Dashboard from "./Dashboard.jsx";
import Notifications from "./Notifications.jsx"
import "../../public/styles.css";
import { BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('')

  useEffect(() => {
  }, [isAuthenticated]);


  let mainContainer;
  if (isAuthenticated === true) {
    mainContainer = <Dashboard />;
  } else {
    mainContainer = <CreateAccount />;
  }

  return (
    <Router>
    <div>
      <nav id="navBarContainer">
        <NavBar logInStatus={isAuthenticated} login={setIsAuthenticated} updateUserId={setUserId} />
      </nav>

      <div id="mainContainer">

      {/* <Route
  path='/dashboard'
  render={(props) => (
    <Dashboard {...props} isAuthed={true} />
  )} */}
       
        <Switch>
           <Route exact path='/' component = {CreateAccount}/>
           <Route path= '/notifcations' component = {Notifications}/>
           <Route path= '/dashboard' component = {Dashboard} />
           <Route path='/addBooks' render={(props) => (<SearchAndAdd {...props} userId = {userId} /> )} />
           <Route path='/orderBooks' component = {OrderBooks} />
        </Switch>
        
      </div>
    </div>
    </Router>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
