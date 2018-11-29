import React from 'react';

import classes from './Name.module.css';


const name = (props) => {
    return (
        <div className={classes.HeaderText}>
            <span className={props.on ? classes.Hi : classes.HiRemove}>Hi,</span>
            <span className={props.on ? classes.My : classes.MyRemove}>my name's</span>
            <span className={props.on ? classes.Name : classes.NameRemove}>Kyle Polson</span>
        </div>
    )
};

export default name;