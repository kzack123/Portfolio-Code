import React, { Component } from 'react';

import classes from './Contact.module.css';

import twitter from '../../imgs/twitter.png';
import github from '../../imgs/github.png';
import codepen from '../../imgs/codepen.png';
import linkedin from '../../imgs/linkedin.png';
import gmail from '../../imgs/gmail.png';
import resume from '../../imgs/resume.png';
import backgroundlines from '../../imgs/back.png';


class Contact extends Component {

    openPageHandler = (page) => {
        //switch statement to open new window with which ever icon was clicked
        switch(page) {
            case "twitter":
                window.open("https://twitter.com/KylePolson2", '_blank');
                window.open("https://twitter.com/KylePolson2");
                break;
            case "codepen":
                window.open("https://codepen.io/kzack/", '_blank');
                window.open("https://codepen.io/kzack/");
                break;
            case "github":
                window.open("https://github.com/kzack123", '_blank');
                window.open("https://github.com/kzack123");
                break;
            case "linkedin":
                window.open("https://www.linkedin.com/in/kyle-polson-a90461168/", '_blank');
                window.open("https://www.linkedin.com/in/kyle-polson-a90461168/");
                break;
            case "resume":
                window.open("https://zety.com/mycv/Kyle.Polson", '_blank');
                window.open("https://zety.com/mycv/Kyle.Polson");
                break;
            default: return;
          }
    }


    render() {
        

        return (
            <div className={this.props.showHide ? classes.Contact : [classes.Contact, classes.ContactRemove].join(' ')}>
                <div className={classes.BackgroundDiv}>
                    <img src={backgroundlines} alt="Gray background" />
                </div>
                <div className={classes.contactContainer}>
                    <h1>Want to work together?</h1>
                    <div className={classes.ContactLinks}>
                        <img src={twitter} alt="Twitter icon" onClick={() => this.openPageHandler('twitter')} />
                        <img src={github} alt="Github icon" onClick={() => this.openPageHandler('github')} />
                        <img src={resume} alt="Resume icon" onClick={() => this.openPageHandler('resume')} />
                        <img src={codepen} alt="Codepen icon" onClick={() => this.openPageHandler('codepen')} />
                        <img src={linkedin} alt="Linkedin icon" onClick={() => this.openPageHandler('linkedin')} />
                        <a href="mailto:kylepolson1993@gmail.com"><img src={gmail} alt="Gmail icon" /></a>
                    </div>
                    <div className={classes.Copyrights}>
                        <p><i>Copyright Kyle Polson &copy;</i></p>
                        <p><i>Coded by: Kyle Polson</i></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;