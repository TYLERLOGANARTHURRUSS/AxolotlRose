import React, {useState, useEffect} from "react";
import axios from 'axios';


const LogInForm = (props) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    
    const handleSubmit = (evt)=>{
        evt.preventDefault();
        axios.post('/login', {'username': username, 'password':password})
        .then(function (response) {
            if(response) location.reload()
        })
        .catch(e => console.log(e))

}
return(
    <form onSubmit = {handleSubmit}>
        <label>
            Username: 
            <input className='textField' id='username' type = "text" value={username} onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
            Password:
            <input className='textField' id='password' type = "password" value = {password} onChange = {e=> setPassword(e.target.value)}/>
        </label>
        <input className='button' type='submit' value='Login'/>
    </form>

)
}

export default LogInForm;