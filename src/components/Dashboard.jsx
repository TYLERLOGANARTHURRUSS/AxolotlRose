import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SearchAndAdd from './SearchAndAdd.jsx'
const Dashboard = () =>{
const [myBooks, setMyBooks] = useState([]);

useEffect(() => {
    axios('get all of our added books from our database')
    .then(data => setMyBooks([...myBooks, data]))
    .then(data=>data.forEach(el => {
        const books = [];
        books.push() 
        console.log(data)
        setResults(results => [...results, 
        <ShowLibraryBooks 
            title = {books[0][0]} 
            author={books[0][1]} 
            imgLink = {books[0][2]}
            id = {books[0][3]}
        />])
        
    }))
}, []);

    

return(
    <div>
        

    </div>
    )

}



export default Dashboard;