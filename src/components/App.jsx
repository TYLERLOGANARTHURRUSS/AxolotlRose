import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import NavBar from "./NavBar.jsx";
import axios from "axios";
import CreateAccount from "./CreateAccount.jsx";
import SearchAndAdd from "./SearchAndAdd.jsx";
import OrderBooks from "./OrderBooks.jsx"
import Dashboard from "./Dashboard.jsx";
import "../../public/styles.css";
import { BrowserRouter, Switch, Route, Link  } from 'react-router-dom'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
  }, [isAuthenticated]);


  let mainContainer;
  if (isAuthenticated === true) {
    mainContainer = <Dashboard />;
  } else {
    mainContainer = <CreateAccount />;
  }

  return (
    <div>
      <nav id="navBarContainer">
        <NavBar logInStatus={isAuthenticated} login={setIsAuthenticated} />
      </nav>

      <div id="mainContainer">
       <BrowserRouter>
        <Switch>
           <Route exact path='/' component = {CreateAccount}/>
           <Route path= '/dashboard' component = {Dashboard} />
           <Route path='/addBooksToLibrary' component = {SearchAndAdd} />
           <Route path='/orderBooks' component = {OrderBooks} />
        </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
