import React, { useState, useEffect } from 'react';

import { Router } from '@reach/router';

import axios from 'axios';
import Dashboard from './pages/Dashboard';
import NewPet from './pages/NewPet';
import Detail from './pages/Detail';
import EditPet from './pages/EditPet';

const Main = () => {
    const [state, setState] = useState("Loading Message!!!!");
    useEffect(() => {
        axios.get("http://localhost:8000/testRun")
            .then(res=>setState(res.data.message))
            .catch(err=> console.log(err))
    })
    return ( 
        <div>
            <h2>Connection Status: {state}</h2>
            <h2>Pet Shelter</h2>
            <Router>
                <Dashboard path="/" />
                <NewPet path="/new" />
                <Detail path="/pets/:id" />
                <EditPet path="/pets/edit/:id" />
            </Router>
        </div>
     );
}
 
export default Main;