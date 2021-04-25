import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar.jsx';
import axios from 'axios';
import CreateAccount from './CreateAccount.jsx'
import Dashboard from './Dashboard.jsx'
import '../../public/styles.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(async ()=>{
  const result = await axios('/api/loggedIn')
  setIsAuthenticated(result.data)
},[isAuthenticated])  ;

  const handleChange = (newValue) =>{
    useEffect(async ()=>{
      const result = await axios('/api/loggedIn')
      setIsAuthenticated(result.data)
    },) 
  }

  let mainContainer;
  if(isAuthenticated === true){
    mainContainer = <Dashboard />
  }
  else {
    mainContainer = <CreateAccount />
  }

   return (
     <div>
    
       <nav id="navBarContainer">
         <NavBar logInStatus={isAuthenticated} onChange={handleChange}/>
       </nav>
      
        <div id='mainContainer'>
          {mainContainer}          
        </div>
      
    </div>
   )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default App;