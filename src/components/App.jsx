import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import NavBar from "./NavBar.jsx";
import axios from "axios";
import CreateAccount from "./CreateAccount.jsx";
import SearchAndAdd from "./SearchAndAdd.jsx";
import OrderBooks from "./OrderBooks.jsx";
import Dashboard from "./Dashboard.jsx";
import Notifications from "./Notifications.jsx";
import "../../public/styles.css";

import { navigate, useRoutes } from "@patched/hookrouter";

const routes = {
  "/": () => <CreateAccount />,
  "/dashboard": () => <Dashboard />,
  "/notifications": () => <Notifications />,
  "/addBooks":  (props) => <SearchAndAdd />,
  "/orderBooks": () => <OrderBooks />,
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const routeResult = useRoutes(routes);
  useEffect(() => {}, [isAuthenticated]);
  

  return (
    <div>
      <nav id="navBarContainer">
        <NavBar
          logInStatus={isAuthenticated}
          login={setIsAuthenticated}
          updateUserId={setUserId}
        />
      </nav>

      <div id="mainContainer">{routeResult}</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export const MyContext = React.createContext(defaultValue);
export default App;
