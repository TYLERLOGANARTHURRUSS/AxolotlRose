import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



const SearchAndAdd = ()=>{
    const [search, setSearch] = useState('')
    const [add, setAdd] = useState('')

    const searchBooks = () => {
        
        axios(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyCG4CetKRxfceKIXmPWjbo5PsOtJ0HOi0U`
        ).then(data=>data.data.items.then(data=>data.forEach(el => console.log(el.title)))).catch(e=>console.log(e))
    }


    return(
        <div>
            <input id='searchBar' type='text' value={search} onChange={e => setSearch(e.target.value)}  />
            <button id='bookSearch' onClick={searchBooks}>Search</button>
            <button id='addToLibrary'>Add</button>
        </div>
    )



}

export default SearchAndAdd;