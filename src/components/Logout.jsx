import React from "react";
import axios from 'axios';

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
    <button className='button' onClick ={handleClick}>Logout</button>

)
}

export default LogOut;