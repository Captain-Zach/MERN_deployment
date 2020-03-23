import React, { useState, useEffect } from 'react';
import InfoBar from '../components/InfoBar';
import io from 'socket.io-client';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const Dashboard = (props) => {
    const [pets, setPets] = useState([]);
    const [socket] = useState(() => io(":8000"));

    useEffect(() => {
        // axios.get("http://localhost:8000/api/pets")
        //     .then(res => {
        //         console.log(res.data);
        //         console.log(typeof(res.data.pets));
        //         setPets(res.data.pets);
        //     })
        //     .catch(err => console.log(err));
        socket.emit("get_pets", "This can be anything");
        socket.on("pet_package", res => {
            setPets(res);
        });
        console.log("Does this happen every time my socket runs?");
        socket.on("retest_event", msg=> {
            console.log("Our socket is doing some work");
            console.log(msg);
            socket.emit("get_pets", "Shoop da woop!");
        })
    }, [])

    const testHandler = e => {
        socket.emit("test_event", "this could be anything");
    }

    const redirectHandler = (e, pet) => {
        e.preventDefault();
        console.log("Yeetus deleetus");
        navigate("/pets/"+pet._id);
    }
    const editHandler = (e, pet) => {
        e.preventDefault();
        console.log("Yeetus changeetus");
        navigate("pets/edit/"+pet._id);
    }
    return ( 
        <div>
            <InfoBar tagline="These pets are looking for a good home" linkTo="/new" linkDesc="add a pet to the shelter, you absolute monster"/>
            <p>This is where we put the table that holds all the pets.</p>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                </thead>
                {pets.map((pet, index) => 
                
                    <tr>
                        
                        <td>{pet.name}</td>
                        <td>{pet.type}</td>
                        <td><Link onClick={e => redirectHandler(e, pet)} to="">details</Link> | <Link onClick={e => editHandler(e, pet)} to="">edit</Link></td>
                    </tr>
                )}
            </table>
            <button onClick={ testHandler}>Test Button</button>
        </div>
     );
}
 
export default Dashboard;