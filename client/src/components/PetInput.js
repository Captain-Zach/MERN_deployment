import React, { useState } from 'react';

const PetInput = (props) => {

    const {name, type, description, skill1, skill2, skill3} = props;
    // Come here when you get back from making lunch (i'm central time)
    
    return ( 
        <div>
            <p>Pet input here</p>
            <label>Pet Name:</label>
            <input type="text" name="name" value={props.state.name} onChange={props.changeHandler} /><br/>
            <label>Pet Type:</label>
            <input type="text" name="type" value={props.state.type} onChange={props.changeHandler} /><br/>
            <label>Pet Description:</label>
            <input type="text" name="description" value={props.state.description} onChange={props.changeHandler} /><br/>
            <label>Pet Skill 1:</label>
            <input type="text" name="skill1" value={props.state.skill1} onChange={props.changeHandler} /><br/>
            <label>Pet Skill 2:</label>
            <input type="text" name="skill2" value={props.state.skill2} onChange={props.changeHandler} /><br/>
            <label>Pet Skill 3:</label>
            <input type="text" name="skill3" value={props.state.skill3} onChange={props.changeHandler} /><br/>
            <button onClick={props.clickHandler} >{props.buttonTag}</button>
        </div>
     );
}
 
export default PetInput;