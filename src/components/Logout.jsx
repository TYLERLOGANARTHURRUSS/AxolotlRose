import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Link } from 'react-router-dom'

const LogOut = () => {
  const handleClick = () => {
    axios
      .delete("/logout", { please: "log me out Mr.Server" })
      .then(function (response) {
        console.log(response);
        location.reload()
      })
      .catch((e) => console.log(e));
  };
  return (
    
        <ul id="navList">
            <li><Link to ='/dashboard'>My Library</Link></li>
            <li><Link to ='/addBooks'>Add to Libary</Link></li>
            <li><Link to="/orderBooks">Order a book</Link></li>
            <li><Link to="/notifications"><FontAwesomeIcon icon={faBell}/></Link></li>
            <li><Link to="/"><FontAwesomeIcon icon={faUserCog} /></Link></li>
            <li><FontAwesomeIcon icon={faDoorClosed} onClick={handleClick} /></li>
        </ul>
    
  );
};

export default LogOut;
