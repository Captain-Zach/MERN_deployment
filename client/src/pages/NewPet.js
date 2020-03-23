import React, { useState, useEffect } from 'react';
import InfoBar from '../components/InfoBar';
import io from 'socket.io-client';
import PetInput from '../components/PetInput';
import axios from 'axios';
import { navigate } from '@reach/router';

const NewPet = (props) => {
    const [socket] = useState(() => io(":8000"));
    const [state, setState] = useState({
        name: "",
        type: "",
        description: "",
        skill1: "",
        skill2: "",
        skill3: "",
    })
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        socket.on("not_valid", data => {
            console.log("your input was invalid");
            setErrors(data);
        })
        socket.on("valid", data => {
            console.log("you did it!");
            navigate("/")
        })
    })

    const changeHandler = e => {
        console.log("Changing state")
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const buttonHandler = e => {
        console.log("handling button things");
        console.log(state)
        socket.emit("new_pet", state);
        // axios.post("http://localhost:8000/api/pets/new", {
        //     ...state,
        // })
        //     .then(res => {
        //         console.log(res);
        //         navigate("/");
        //     })
        //     .catch(err=>console.log(err));
    }
    return ( 
        <div>
            <InfoBar tagline="Know a pet needing a home?" linkTo="/" linkDesc="back to home" />
            <p>Pet Input Card Below</p>
            <PetInput state={state} changeHandler={changeHandler} buttonTag="Add New Pet" clickHandler={buttonHandler} />
            {errors.map((error, index) => 
                <p>{error} error number {index}</p>
            )}
        </div>
     );
}
 
export default NewPet;