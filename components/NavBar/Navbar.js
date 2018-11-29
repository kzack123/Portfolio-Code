import React from 'react';

import classes from './Navbar.module.css';


const navbar = (props) => {
    return (
        <div className={!props.showNav ? classes.Navbar : [classes.Navbar, classes.NavbarRemove].join(' ')}>
            <h3 
                className={classes.NavItem} 
                onClick={() => props.toggleMenu('home')}>Home</h3>
            <h3 
                className={props.selectedTab === 'about' ? [classes.NavItem, classes.NavItemSelected].join(' ') : classes.NavItem} 
                onClick={() => props.toggleMenu('about')}>About</h3>
            <h3 
                className={props.selectedTab === 'projects' ? [classes.NavItem, classes.NavItemSelected].join(' ') : classes.NavItem} 
                onClick={() => props.toggleMenu('projects')}>Projects</h3>
            <h3 
                className={props.selectedTab === 'contact' ? [classes.NavItem, classes.NavItemSelected].join(' ') : classes.NavItem} 
                onClick={() => props.toggleMenu('contact')}>Contact</h3>
        </div>
    )
};

export default navbar;