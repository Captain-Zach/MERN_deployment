import React from 'react';
import { Link } from '@reach/router';

const InfoBar = (props) => {

    return ( 
        <div>
            <h2>{props.tagline} {props.extras}</h2>
            <Link to={props.linkTo}>{props.linkDesc}</Link>

        </div>
     );
}
 
export default InfoBar;

// BRB 