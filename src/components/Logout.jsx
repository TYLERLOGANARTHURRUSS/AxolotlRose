import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';

const LogOut = () => {
   
    const handleClick = ()=>{
        
        axios('/logout', {'please': 'log me out Mr.Server'})
        .then(function (response) {
            console.log(response)
            if(response) location.reload()
        })
        .catch(e => console.log(e))
}
return(
    <ul id='navList'>
        <li><a href='/'>My Library</a></li>
        <li><a href='/'>Order a book</a></li>
        <li><a href='/'><FontAwesomeIcon icon={faBell}/></a></li>
        <li><a href='/'><FontAwesomeIcon icon={faUserCog}/></a></li>
        <li><a href='/'><FontAwesomeIcon icon={faDoorClosed}/></a></li>        
    </ul>

)
}

export default LogOut;