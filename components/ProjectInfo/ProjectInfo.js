import React from 'react';

import classes from './ProjectInfo.module.css';

import burger from '../../imgs/burger.png';
import blocks from '../../imgs/blocks.png';
import jammming from '../../imgs/Optimized-jammming.png';
import login from '../../imgs/login.png';
import quiz from '../../imgs/quiz.png';
import ravanes from '../../imgs/Optimized-ravanes.png';
import me from '../../imgs/us.jpg';

const projectInfo = (props) => {
    
    const openPage = () => {
        /*var the gets the id of which project was clicked on through props
        through the projectInfoHandler handler in the FrontPage container
        which is triggered when someone clicks on one of the projects in the
        Projects container*/
        let getId = props.projectInfo;
        //switch statement to open new window with which ever project was clicked
        switch(getId) {
            case "login":
                window.open("https://kzack123.github.io/React-Login/", '_blank');
                window.open("https://kzack123.github.io/React-Login/");
                break;
            case "quiz":
                window.open("https://codepen.io/kzack/full/wpdQov", '_blank');
                window.open("https://codepen.io/kzack/full/wpdQov");
                break;
            case "ravanes":
                window.open("http://ko-ravenous.surge.sh", '_blank');
                window.open("http://ko-ravenous.surge.sh");
                break;
            case "blocks":
                window.open("https://kzack123.github.io/Blocks/", '_blank');
                window.open("https://kzack123.github.io/Blocks/");
              break;
            case "jammming":
                window.open("http://ko-Jamming-prj.surge.sh", '_blank');
                window.open("http://ko-Jamming-prj.surge.sh");
                break;
            case "burger":
                window.open("https://react-burger-webapp.firebaseapp.com/", '_blank');
                window.open("https://react-burger-webapp.firebaseapp.com/");
                break;
            default: return;
        }
    
      }


    let project = null;
    //switch statment which Project info is displayed through the props
    switch (props.projectInfo) {
        case 'burger':
        project = (
            <div>
                <div className={classes.picHolder}>
                    <img src={burger} alt="Burger Builder web app" onClick={openPage} />
                </div>
                <h1>Burger Builder</h1>
                <p>In the Burger Builder Web-App you get to build your perfect burger, then place your order! 
                Constructed using HTML, CSS, React and Redux. Includes other packages, such as React Router and 
                axios for getting and posting data to the server, for each users order information.</p>
            </div>
        );
        break;
        case 'blocks':
            project = (
                <div>
                    <div className={classes.picHolder}>
                        <img src={blocks} alt="Blocks game" onClick={openPage} />
                    </div>
                    <h1>Blocks</h1>
                    <p>The Blocks game, can you match them all? test your memory! Built with HTML, CSS, Bootstrap, Javascript and jQuery.</p>
                </div>
            );
            break;
        case 'jammming':
            project = (
                <div>
                    <div className={classes.picHolder}>
                        <img src={jammming} alt="Jammming web app" onClick={openPage} />
                    </div>
                    <h1>Jammming</h1>
                    <p>This is my Jammming Web-App! Find and add any song from Spotify's extensive library, to your very own playlist on Spotify.
                    Developed using HTML, CSS and React, also used Spotify's API to get access to their music and your account.</p>
                </div>
            );
            break;
        case 'login':
            project = (
                <div>
                    <div className={classes.picHolder}>
                        <img src={login} alt="Mock login website" onClick={openPage} />
                    </div>
                    <h1>Login</h1>
                    <p>This is my Login Web-App. Create an account, then sign in to see your newly created account with all your details and data saved. 
                    Created using HTML, CSS and React.</p>
                </div>
            );
            break;
        case 'quiz':
            project = (
                <div>
                    <div className={classes.picHolder}>
                        <img src={quiz} alt="See how well you know me quiz website" onClick={openPage} />
                    </div>
                    <h1>Quiz</h1>
                    <p>This is <em>The Kyle Quiz Game</em>, you can learn more things about me in a fun way! Made using HTML, CSS, Javascript and jQuery.</p>
                </div>
            );
            break;
        case 'ravanes':
            project = (
                <div>
                    <div className={classes.picHolder}>
                        <img src={ravanes} alt="Ravanas restaurant finder" onClick={openPage} />
                    </div>
                    <h1>Ravanes</h1>
                    <p>Last but definitely not least, the Ravanes Web-App. Find restaurants anywhere 
                    in the world! easy task when all you have to do is type whatever food you're craving and hit <em>Search</em>. 
                    Developed with HTML, CSS and React, reaching out to Yelps API, you can view millions of restaurants wherever you 
                    are, in the planet.</p>
                </div>
            );
            break;
            case 'aboutMe':
            project = (
                <div className={classes.MeP}>
                    <div className={classes.Me}>
                        <img src={me} alt="Pic of Me the creator of this site :)" />
                    </div>
                    <h1>Let's get to know me a bit</h1>
                    <p>I'm Kyle I've been coding for a few years now. I've been a tech aficionado ever since my dad came home with our very own Windows 95 computer. 
                        But my love for technology really exploded once I picked up writing code, I found a brand new passion, a whole new world that I just can't get enough of.
                        I haven't been able to put it down since. I strive to learn everything I can about new techniques and languages, and I hope to 
                        do this for the rest of my life.  </p>
                        <span className={classes.Quote}><i>"Changing the world one line of code at a time."</i></span>
                </div>
            );
            break;
        default:
            project = (
                <div>
                    <div className={classes.picHolder}>
                        <img src={burger} alt="Burger Builder web app" onClick={openPage} />
                    </div>
                    <h1>Burger Builder</h1>
                    <p>This is my Burger Builder Web-App. Build your perfect burger then place your order! Constructed using HTML, CSS, React and Redux. also made use of some other packages such as React Router and axios for getting and posting data to the server for order information.</p>
                </div>
            );
    }

    return (
            <div className={!props.removeProjectInfo ? classes.Project : [classes.Project, classes.ProjectRemove].join(' ')}>
                {project}
            </div>
    );
}

export default projectInfo;