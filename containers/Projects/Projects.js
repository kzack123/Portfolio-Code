import React, { Component } from 'react';

import classes from './Projects.module.css';

import burger from '../../imgs/burger.png';
import blocks from '../../imgs/blocks.png';
import jammming from '../../imgs/Optimized-jammming.png';
import login from '../../imgs/login.png';
import quiz from '../../imgs/quiz.png';
import ravanes from '../../imgs/Optimized-ravanes.png';

class Projects extends Component {
    render() {
        return (
            <div className={classes.Projects}>
                <div className={this.props.showHide ? classes.ProjectsOne : classes.ProjectsOneRemove}>
                    <img src={burger} alt="Burger Builder web app" className={classes.Burger} onClick={() => this.props.projectInfo('burger')} />
                    <img src={blocks} alt="Blocks game" className={classes.Blocks} onClick={() => this.props.projectInfo('blocks')} />
                    <img src={jammming} alt="Jammming web app" className={classes.Jammming} onClick={() => this.props.projectInfo('jammming')} />
                </div>
                <div className={this.props.showHide ? classes.ProjectsTwo : classes.ProjectsTwoRemove}>
                    <img src={login} alt="Mock login website" className={classes.Login} onClick={() => this.props.projectInfo('login')} />
                    <img src={quiz} alt="See how well you know me quiz website" className={classes.Quiz} onClick={() => this.props.projectInfo('quiz')} />
                    <img src={ravanes} alt="Ravanas restaurant finder" className={classes.Ravanes} onClick={() => this.props.projectInfo('ravanes')} />
                </div>
                
            </div>
        );
    }
}

export default Projects;