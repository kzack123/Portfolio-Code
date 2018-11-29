import React, { Component } from 'react';

import classes from './About.module.css';
import gear from '../../imgs/gear.png';

import html from '../../imgs/html.svg';
import css from '../../imgs/css.svg';
import bootstrap from '../../imgs/bootstrap.svg';
import javascript from '../../imgs/javascript.svg';
import react from '../../imgs/react.svg';
import jquery from '../../imgs/jquery.svg';
import book from '../../imgs/book.png';

class About extends Component {
    state = {
        showHideAbout: false,
        html: classes.pic,
        css: classes.pic,
        bootstrap: classes.pic,
        javascript: classes.pic,
        react: classes.pic,
        jquery: classes.pic 
    }


    //handler to determine which icon should activate the fly animation
    flyHandler = (event) => {
        switch (event) {
            case 'html': 
                this.setState({html: [classes.pic, classes.fly].join(' ')});
                setTimeout(() => {
                    this.setState({html: classes.pic})
                }, 1000)
                break;
            case 'css': 
                this.setState({css: [classes.pic, classes.fly].join(' ')});
                setTimeout(() => {
                    this.setState({css: classes.pic})
                }, 1000)
                break;
            case 'javascript': 
                this.setState({javascript: [classes.pic, classes.fly].join(' ')});
                setTimeout(() => {
                    this.setState({javascript: classes.pic})
                }, 1000)
                break;
            case 'bootstrap': 
                this.setState({bootstrap: [classes.pic, classes.fly].join(' ')});
                setTimeout(() => {
                    this.setState({bootstrap: classes.pic})
                }, 1000)
                break;
            case 'jquery': 
                this.setState({jquery: [classes.pic, classes.fly].join(' ')});
                setTimeout(() => {
                    this.setState({jquery: classes.pic})
                }, 1000)
                break;
            case 'react': 
                this.setState({react: [classes.pic, classes.fly].join(' ')});
                setTimeout(() => {
                    this.setState({react: classes.pic})
                }, 1000)
                break;
            default: return;
        }     
    }

    

    render() { 
        return (
            <div className={!this.props.showhide ? [classes.About, classes.AboutRemove].join(' ') : classes.About}>
                <div className={classes.Studied}>
                    <div className={classes.StudiedAt}>
                        <div className={classes.StudiedAtContent}>
                            <p>Renton Technical College</p>
                            <p>Codecademy</p>
                            <p>FreeCodeCamp</p>
                            <p>GitHub</p>
                            <p>Stackoverflow</p>
                            <p>Udemy</p>
                        </div>
                        <h2>Studied at</h2>
                        <img src={gear} alt="Gear" />
                    </div>
                    <div className={classes.StudiedWhat}>
                        <div className={classes.StudiedWhatContent}>
                            <p>HTML / CSS</p>
                            <p>BootStrap</p>
                            <p>React</p>
                            <p>SQL</p>
                            <p>Redux</p>
                            <p>jQuery</p>
                            <p>Javascript</p>
                        </div>
                        <h2>Proficient in</h2>
                        <img src={gear} alt="Gear" />
                    </div>
                </div>
                <div className={classes.Logo}>
                    <img className={this.state.javascript} onClick={() => this.flyHandler('javascript')} src={javascript} alt="Javascript icon" />
                    <p className={classes.ClickUs}>Click us!</p>
                    <img className={this.state.react} onClick={() => this.flyHandler('react')} src={react} alt="React icon" />
                    <img className={this.state.jquery} onClick={() => this.flyHandler('jquery')} src={jquery} alt="Jquery icon" />
                    <img className={classes.Book} onClick={() => this.props.projectInfo('aboutMe')} src={book} alt="Book icon about section" />
                    <div className={classes.IconPulse}></div>
                    <img className={this.state.html} onClick={() => this.flyHandler('html')} src={html} alt="HTML icon" />
                    <img className={this.state.css} onClick={() => this.flyHandler('css')} src={css} alt="CSS icon" />
                    <img className={this.state.bootstrap} onClick={() => this.flyHandler('bootstrap')} src={bootstrap} alt="Bootstrap icon" />
                </div>
            </div>
        );
    }
}


export default About;