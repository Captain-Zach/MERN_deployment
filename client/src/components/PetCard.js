import React from 'react';

const PetCard = (props) => {
    return ( 
        <div>
            <h3>Pet type:  {props.state.type}</h3>
            <h3>Description: {props.state.description}</h3>
            <h3>Skills: {props.state.skill1}<br/>{props.state.skill2}<br/>{props.state.skill3}<br/></h3>


        </div>
     );
}
 
export default PetCard;