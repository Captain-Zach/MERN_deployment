import React, { useState, useEffect } from 'react';
import InfoBar from '../components/InfoBar';
import axios from 'axios';
import io from 'socket.io-client';
import PetInput from '../components/PetInput';
import PetCard from '../components/PetCard';
import { navigate } from '@reach/router';

const Detail = (props) => {
    const [socket] = useState(() => io(":8000"));
    const [state, setState] = useState({
        name: "asdf",
        type: "asdf",
        description: "asdf",
        skill1: "asdf",
        skill2: "adsf",
        skill3: "asdf",
    });

    const [newState, setNewState ] = useState({});
    
    const emergencyTest = (res) => {
        setState({
            name: res.data.pet.name,
            type: res.data.pet.type,
            description: res.data.pet.description,
            skill1: res.data.pet.skill1,
            skill2: res.data.pet.skill2,
            skill3: res.data.pet.skill3,
        })
        console.log("Emergency happening");
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/"+props.id)
            .then(res => {
                emergencyTest(res)
            })
            .catch(err => console.log(err));
    }, []);
    
    const changeHandler = e => {
        console.log("Change handler firing");
        // setState({
        //     ...state,
        //     [e.target.name]: e.target.value,
        // })
    }

    const buttonHandler = e => {
        console.log("Button handler firing");
        socket.emit("delete_pet", {id:props.id});
        navigate("/");
        
    }

    return ( 
        <div>
            <InfoBar tagline="Details about: " extras={state.name} linkTo="/" linkDesc="back to home" />
            <button onClick={buttonHandler} >Adopt {state.name}</button>
            <p>This is where pet details go.</p>
            <PetCard state={state} />
        </div>
     );
}
 
export default Detail;