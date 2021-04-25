import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ShowBooks from './ShowBooks.jsx'


const SearchAndAdd = ()=>{
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [add, setAdd] = useState('');
    const searchBooks = () => {
        setResults([]);
        axios(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyCG4CetKRxfceKIXmPWjbo5PsOtJ0HOi0U`
        ).then(data=>data.data.items).then(data=>data.forEach(el => {
            const books = [];
            books.push([el.volumeInfo.title, el.volumeInfo.authors[0], el.volumeInfo.imageLinks.thumbnail, el.volumeInfo.industryIdentifiers[1].identifier]) 
            console.log(data)
            setResults(results => [...results, 
            <ShowBooks 
            title = {books[0][0]} 
            author={books[0][1]} 
            imgLink = {books[0][2]}
            identifier = {books[0][3]}
            />])
            
        }))
        .catch(e=>console.log(e))
        console.log(results)
    }     
        

    return(
        <div>
            <input id='searchBar' type='text' value={search} onChange={e => setSearch(e.target.value)}  />
            <button id='bookSearch' onClick={searchBooks}>Search</button>
            <div id = 'bookDisplay'>
                {results}
            </div>
            
         
            
            
        </div>
    )



}

export default SearchAndAdd;