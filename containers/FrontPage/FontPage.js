import React, { Component } from 'react';

import classes from './FrontPage.module.css';
import arrows from '../../imgs/arrows.png';
import Game from '../Game/Game';
import About from '../About/About';
import Navbar from '../../components/NavBar/Navbar';
import Projects from '../Projects/Projects';
import Contact from '../Contact/Contact';

import Name from '../../components/Name/Name';

import ProjectInfo from '../../components/ProjectInfo/ProjectInfo';
import Backdrop from '../../components/Backdrop/Backdrop';



class FrontPage extends Component {
    state = {
        screen: 'home',
        home: true,
        game: false,
        about: false,
        projects: false,
        contact: false,
        showBackdrop: false,
        projectInfo: 'none',
        removeProjectInfo: false,
        showNav: false,
      }

    componentDidMount() {
        this.makeStars()
    }

    //function that creates the starts in the background
    makeStars = () => {

      //Start canvas set up
      let canvas = document.getElementById('stars');
      let c = canvas.getContext('2d');
      let self = this;

      canvas.width = window.innerWidth + 300;
      canvas.height = window.innerHeight;
      
      //count for amount of stars
      let particleCount = 450;

      //starts function 
      function LightParticle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.update = function() {

          this.draw();
        };

        this.draw = function() {
          if (self.state.game) {
            c.save();
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            //c.shadowColor = this.color;
            //c.shadowBlur = 3;
            //c.shadowOffsetX = 400;
            //c.shadowOffsetY = 400;
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
            c.restore();
          } else {
            c.save();
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.shadowColor = this.color;
            c.shadowBlur = 1;
            c.shadowOffsetX = 400;
            c.shadowOffsetY = 400;
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
            c.restore();
          }
          
        };

      }
      //stars array
      let lightParticles = [];


      //stars speed time opacity and random colors for them
      let timer = 0;
      let opacity = .8;
      let speed = 0.0005;
      const colors = [
        "#0849aa",
        "#0d84ce",
        "#6fccf1",
        "#fcff99",
        "#FFFFFF",
        "#0849aa",
        "#efa3a3",
        "#0d84ce",
        "#6fccf1",
        "#fcff99",
        "#FFFFFF"
      ];
      
      //initializing starts determining color radius and location on the canvas
      const initializeParticles = () => {
        for (let i = 0; i < particleCount; i++) {
          let randomColorIndex = Math.floor(Math.random() * 6);
          let randomRadius = Math.random() * 2;
          let x = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;
          let y = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;
          lightParticles.push(new LightParticle(x, y, randomRadius, colors[randomColorIndex]));
        }
      };

      initializeParticles();

      //eventListener to reinitialize starts when screen is resized
      window.addEventListener("resize", event => {
        lightParticles = [];
        initializeParticles();
    });

      const animate = () => {
        window.requestAnimationFrame(animate);
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          canvas.width = window.innerWidth + 300;
          canvas.height = window.innerHeight;
        }
        
        c.save();
        //changing opacity of stars
        let originalOpacity = 1;
        opacity += (originalOpacity - opacity) * 0.01;
        c.fillStyle = "rgba(18, 18, 18, " + opacity + ")";
        //changing speed of starts
        let originalSpeed = 0.001;
        speed += (originalSpeed - speed) * 0.01;
        timer += speed;

        c.fillRect(0, 0, canvas.width, canvas.height);
        c.translate(canvas.width / 2, canvas.height/2 );
        c.rotate(timer);

        for (let i = 0; i < lightParticles.length; i++) {
          lightParticles[i].update();
        }
        c.restore();
      }
      animate();
      document.getElementById("stars").addEventListener('touchstart', function(e){
        //e.preventDefault()
      })
    }

    showPrjsHandler = () => {
      this.setState({showPrjs: true});
    }
    
    //handler for changing state to set what is shown on the screen
    toggleMenu = (name) => {
      switch (name) {
        case 'home':
          this.setState({home: false, game: false, about: false, projects: false, contact: false});
          setTimeout(() => {
            this.setState({screen: 'home', home: true});
          }, 1000)
          setTimeout(() => {
            this.setState({showNav: false});
          }, 2000)
          break;
        case 'about':
          this.setState({home: false, game: false, about: false, projects: false, contact: false});
          setTimeout(() => {
            this.setState({screen: 'about', about: true});
          }, 1000)
          setTimeout(() => {
            this.setState({showNav: true});
          }, 500)
          break;
        case 'projects':
          this.setState({home: false, game: false, about: false, projects: false, contact: false});
          setTimeout(() => {
            this.setState({screen: 'projects', projects: true});
          }, 1000)
          break;
        case 'contact':
          this.setState({home: false, game: false, about: false, projects: false, contact: false});
          setTimeout(() => {
            this.setState({screen: 'contact', contact: true});
          }, 1000)
          break;
        case 'game':
          this.setState({home: false, game: false, about: false, projects: false, contact: false});
          setTimeout(() => {
            this.setState({screen: 'game', game: true});
        }, 1000)
          break;
        default:
          this.setState({home: false, game: false, about: false, projects: false, contact: false});
      }
    }


    //togglers to show or hide popups and backgrounds for them
    projectInfoHandler = (info) => {
      this.setState({showBackdrop: true, projectInfo: info, removeProjectInfo: false});
    }

    removeBackdropHandler = () => {
      this.setState({removeProjectInfo: true});
      setTimeout(() => {
        this.setState({showBackdrop: false});
      }, 250)
    }

    render() {

      let screen = 'home';
      switch (this.state.screen) {
        
          case 'home':
            screen = (
              <div>
                <Name on={this.state.home} />
                <div className={this.state.home ? classes.Arrows : [classes.Arrows, classes.RemoveArrow].join(' ')} onClick={() => this.toggleMenu('about')}>
                    <img className={classes.ArrowEnter} src={arrows} alt="Go to next page Arrows" />
                </div>
              </div>
            )
            break;
          case 'about':
              screen = <About showhide={this.state.about} projectInfo={(info) => this.projectInfoHandler(info)} />
              break;
          case 'projects':
              screen = <Projects projectInfo={(info) => this.projectInfoHandler(info)} showHide={this.state.projects} />
              break;
          case 'contact':
              screen = <Contact showHide={this.state.contact} />
              break;
          case 'game':
              screen = <Game toggleGame={this.state.game} returnHome={() => this.toggleMenu('home')} />
              break;
          default:
              screen = (
                <div>
                  <Name on={this.state.home} />
                  <div className={this.state.home ? classes.Arrows : [classes.Arrows, classes.RemoveArrow].join(' ')} onClick={() => this.toggleMenu('about')}>
                      <img className={classes.ArrowEnter} src={arrows} alt="Go to next page Arrows" />
                  </div>
                </div>
              )
      }

      let nav = null;
      let retroBtn = null;

      if (this.state.screen === "home") {
        retroBtn = <h4 onClick={() => this.toggleMenu('game')} className={!this.state.home ? [classes.getRetroBtn, classes.removeRetroBtn].join(' ') : classes.getRetroBtn}>Space Invasion</h4>;
      }

        if (this.state.showNav) {
          nav = <Navbar selectedTab={this.state.screen} showNav={this.state.home} toggleMenu={(name) => this.toggleMenu(name)} />;
        }

        return (
            <div className={classes.Main}>
                <canvas id="stars" className={classes.Stars} ></canvas>
                {nav}
                {screen}
                {retroBtn}
                <div style={{display: this.state.showBackdrop ? '' : 'none'}}>
                  <Backdrop removeBackdrop={this.removeBackdropHandler} />
                  <ProjectInfo removeProjectInfo={this.state.removeProjectInfo} projectInfo={this.state.projectInfo} />
                </div>
            </div>
        );
    }
}

export default FrontPage;