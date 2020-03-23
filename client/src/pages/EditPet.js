import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import PetInput from '../components/PetInput';
import InfoBar from '../components/InfoBar';
import { navigate } from '@reach/router';

const EditPet = (props) => {
    const [socket] = useState(() => io(":8000"));
    const [state, setState] = useState({
        name: "asdf",
        type: "asdf",
        description: "asdf",
        skill1: "asdf",
        skill2: "adsf",
        skill3: "asdf",
    });
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        socket.emit("only_pet", {id:props.id});


        socket.on("receive_pet", data => {
            console.log("receiving pet here");
            console.log(data);
            console.log(data.name);
            setState({
                name: data.name,
                type: data.type,
                description: data.description,
                skill1: data.skill1,
                skill2: data.skill2,
                skill3: data.skill3
            })
        })
        socket.on("not_valid", data => {
            console.log("Data not valid");
            setErrors(data);
        })
        socket.on("valid", data => {
            console.log("data was valid, hooray!");
            console.log(data);
            navigate("/");
        })

    }, [])

    const changeHandler = e => {
        console.log("Handling changes");
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const buttonHandler = e => {
        console.log("Handing button");
        socket.emit("edit_pet", {state: state, id: props.id});
    }
    return ( 
        <div>
            <InfoBar tagline="Edit: " extras={state.name} linkTo="/" linkDesc="back to home" />
            <p>this is where pets get edited</p>
            <PetInput state={state} changeHandler={changeHandler} buttonTag="Edit Pet" clickHandler={buttonHandler} />
            {errors.map((error, index) => 
                <p>{error} error number {index}</p>
            )}
        </div>
     );
}
 
export default EditPet;