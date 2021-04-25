import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const ShowBooks = (props)=>{


    return(

        <div id='bookDisplay'>
            <h3>{props.title}</h3>
            <img src={props.imgLink}/>
            <h4>{props.author}</h4>

        </div>

    )

}


export default ShowBooks;