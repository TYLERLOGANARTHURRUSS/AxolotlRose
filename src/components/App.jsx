import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar.jsx';
import axios from 'axios';
// import CreateAccount from './createAccount.jsx'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(async ()=>{
  const result = await axios('/api/loggedIn')
  setIsAuthenticated(result.data)
},[isAuthenticated])  ;

  const handleChange = (newValue) =>{
    useEffect(async ()=>{
      const result = await axios('/api/loggedIn')
      setLogged(result.data)
    },) 
  }

  let mainContainer;
  if(logged === true){
    mainContainer = <MapChart countryArray = {countryArray} setCountryArray = {setCountryArray}/>
  }else {
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