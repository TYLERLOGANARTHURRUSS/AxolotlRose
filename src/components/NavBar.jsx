import React from "react";
import LogInForm from './login.jsx'
import LogOut from './logout.jsx'

const NavBar = (props) => {
    let logInStatus = props.logInStatus;
    let component;
    if(logged === true) component = <LogOut />
    else if(logged === false) component = <LogInForm onChange={props.onChange}/>
    
     return(
    <div id='navContainer'>
        <h1>Big Little Library</h1>
        <div id='logins'>
        {component}
        </div>
    </div>
)
}

export default NavBar;