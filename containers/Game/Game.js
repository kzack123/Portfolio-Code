import React, { Component } from 'react';

import classes from './Game.module.css';

import enemy1 from '../../imgs/game/enemy1.png';
import enemy2 from '../../imgs/game/enemy2.png';
import enemy3 from '../../imgs/game/enemy3.png';
import enemy4 from '../../imgs/game/enemy4.png';
import enemy5 from '../../imgs/game/enemy5.png';
import laserbeam from '../../imgs/game/laserbeam.png';
import main from '../../imgs/game/main.png';
import heart from '../../imgs/game/heart.png';

import Laser from './Sounds/Laser.mp3';
import Explosion from './Sounds/Explosion.mp3';
import UnPause from './Sounds/UnPause.mp3';
import Pause from './Sounds/Pause.mp3';
import Lost from './Sounds/Lost.mp3';
import Begin from './Sounds/Begin.mp3';


//////////////////// Canvas and its height width and Context ////////////////////


//games canvas variables which get on StartGame method 
let gameCanvas = null;
let cc = null;

// pause or unpause the game
let pauseGame = null;

// for calling the shoot method to fire laser
let makeItRain = null;

// mouse posistion
const mouse = {
    x: window.innerWidth / 2,
}

// number of ships destroyed for score board
let score = null;

//main ships health
let health = null;

// enemy ships 
let circleArray = null
// number of enemy ships
let number = null;
// holds debris particals 
let debrisArry = null;
// holds smoke coming off of debris
let smokeArry = null;

//holds number of enemys for number var to not loose number
let holdNum = null;

// starting at which they spawn
let speed = null;

let firstShot = null;


// holds Rocket Obj when fired
let laserFired = null;

// goes true when reloading to provent firing untell reloading is done
let reloading = null;

//redeploy timer for when resuming the game after pausing it
let timer = null;

//Audio sounds and volume levels

const laser = new Audio(Laser);
laser.volume = 0.08;

const unPause = new Audio(UnPause);
unPause.volume = 0.03;

const pause = new Audio(Pause);
pause.volume = 0.03;

let lost = null;

const begin = new Audio(Begin);
begin.volume = 0.03;

let explosions = null;


class Game extends Component {
    
    state = {
        pauseGame: false,
        youLost: false
    }
    
    // Start game //

    componentDidMount() {
        this.start();
    }

    start = () => {
        
        // setting all vars to staring game posistion
        this.setState({pauseGame: false, youLost: false});
        debrisArry = [];
        explosions = new Audio(Explosion);
        lost = new Audio(Lost);
        smokeArry = [];
        holdNum = null;
        gameCanvas = null;
        cc = null;
        pauseGame = false;
        makeItRain = false;
        mouse.x = window.innerWidth / 2;
        score = 0;
        health = 3;
        circleArray = [];
        number = 1000;
        speed = 1200;
        laserFired = [];
        firstShot = false;
        reloading = false;
        timer = null;
        begin.play();
        const scoreElm = document.getElementById('score');
        scoreElm.innerHTML = "Score: 0"
        for (let i=1;i<4;i++) {
            let hearts = document.getElementById('heart' + i);
            hearts.style.display = "";
        }
        //starts game
        window.setTimeout(function () {
            gameCanvas = document.getElementById('game');
            cc = gameCanvas.getContext('2d');
            gameCanvas.width = window.innerWidth;
            gameCanvas.height = window.innerHeight;
            document.getElementById("GameTab").focus();
        }, 1);
        setTimeout(() => this.startGame(), 10);
    }


    //////////////////// Game menu hide/show handler ////////////////////

    changePauseHandler = (e) => {
        if (!this.state.youLost) {
            

            if (e.keyCode === 27 || e.target.id === 'mobilePause') {
                if (this.state.pauseGame) {
                    unPause.pause();
                    unPause.currentTime = 0;
                    unPause.play();
                    this.setState({pauseGame: false});
                } else {
                    pause.pause();
                    pause.currentTime = 0;
                    pause.play();
                    this.setState({pauseGame: true});
                }
            } else {
                return
            }
            
        } else {
            return;
        }    
    }


        //////////////////// Mouse loctaion ////////////////////


    mouseMove = (e) => {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mouse.x = e.nativeEvent.offsetX;
        } else {
            return;
        }
    }

    

    // for calling the shoot method to fire laser true = fire
    fireIt = () => {
        makeItRain = true;
        window.setTimeout(function () {
            makeItRain = false;
        }, 390);
    }


    // Game method //

    startGame = () => {

        const self = this;

        //////////////////// Mobile movment and fire laser functions ////////////////////
        
        document.getElementById('GameTab').addEventListener('touchmove', function(event) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                mouse.x = event.touches[0].clientX;
                shoot();
            } else {
                return;
            }
          });

        document.getElementById('GameTab').addEventListener('touchstart', function(event) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                shoot();
            } else {
                return;
            }
        });


        //////////////////// Enemy ship's ////////////////////


        function EnemyShip(x, y, dx, dy, width, height, enemy) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.width = width;
            this.height = height;
            this.enemy = enemy;
            this.explosion = function() {
                explosions.currentTime = 0;
                explosions.volume = 0.15;
                explosions.play();
            }
            
            this.exploded = false;
            this.opacity = 1;
            this.radius = 5;

            this.directions = function() {
                if (Math.random() > .5) {
                return -Math.random();
                } else {
                return Math.random();
                }
            }
            //Normal ship draw function
            this.draw = function() {
                cc.save();
                
                cc.beginPath();    
                cc.drawImage(this.enemy, this.x, this.y, this.width, this.height);
                cc.strokeStyle = 'blue';   
                cc.stroke();
                cc.closePath();  
                cc.restore();
            }
            //exploding ship function
            this.DrawExplosion = function() {
                cc.save();
                cc.beginPath();
                cc.fillStyle = `rgba(84, 84, 84, ${this.opacity})`;
                cc.strokeStyle= `rgba(84, 84, 84, ${this.opacity})`;
                cc.arc(this.x - 4, this.y + 5, this.radius, 0, 2 * Math.PI);
                cc.fill();
                cc.closePath();
                
                cc.beginPath();
                cc.fillStyle = `rgba(255, 102, 0, ${this.opacity})`;
                cc.strokeStyle= `rgba(255, 133, 51, ${this.opacity})`;
                cc.arc(this.x + 4, this.y, this.radius, 0, 2 * Math.PI);
                cc.fill();

                cc.closePath();

                cc.beginPath();
                cc.fillStyle = `rgba(255, 102, 0, ${this.opacity})`;
                cc.strokeStyle= `rgba(255, 133, 51, ${this.opacity})`;
                cc.arc(this.x, this.y - 4, this.radius, 0, 2 * Math.PI);
                cc.fill();
                cc.closePath();

                cc.beginPath();
                cc.fillStyle = `rgba(255, 102, 0, ${this.opacity})`;
                cc.strokeStyle= `rgba(255, 133, 51, ${this.opacity})`;
                cc.arc(this.x - 2, this.y + 4, this.radius, 0, 2 * Math.PI);
                cc.fill();
                cc.closePath();

                cc.beginPath();
                cc.fillStyle = `rgba(255, 102, 0, ${this.opacity})`;
                cc.strokeStyle= `rgba(255, 133, 51, ${this.opacity})`;
                cc.arc(this.x + 3, this.y + 4, this.radius, 0, 2 * Math.PI);
                cc.fill();
                cc.stroke();
                cc.closePath();

                cc.restore();
                cc.closePath();
            }
            
            this.update = function() {
                
                if (this.exploded) {
                    if (this.radius > 35) {
                        return;
                    }
                    if (this.y > window.innerHeight + 250) {
                        return;
                    } else {
                        this.opacity -=0.025;
                        this.radius +=0.83;
                        this.DrawExplosion();
                    }
                } else {
                    if (this.x + this.width > window.innerWidth || this.x < 0) {
                        this.dx = -this.dx;
                    } else {
                        if (this.dx < 0) {
                            this.dx = this.dx + 2;
                        } else if (this.dx > 0) {
                            this.dx = this.dx - 2;
                        }
                    }
                    this.x += this.dx;
                    this.y += this.dy;
                    this.draw();
                }
            }    
        }


        //////////////////////////// Debris for exploded ships ///////////////////////
        

        function Debris(x, y) {
            this.x = x;
            this.y = y;
            this.dx = 5;
            this.dy = .2;
            this.radius = 10;
            this.rotate = 180;
            this.opacity = 1;
            this.random = Math.random();
            this.count = 0;
            this.howOften = 5;
            
            this.draw = function() {
                cc.save();
                cc.beginPath();
                cc.fillStyle = `rgba(255, 102, 0, ${this.opacity})`;
                cc.strokeStyle= `rgba(255, 133, 51, ${this.opacity})`;
                cc.arc(this.x - 35, this.y + 5, this.radius, 0, 2 * Math.PI);
                cc.fill();
                cc.stroke();
                cc.restore();
                cc.closePath();
            }
            
            this.update = function() {
                if (this.radius < 0.10) {
                    return;
                } else {
                    if (this.random < .25) {
                        this.y -= this.dy;
                        this.x -= 2;
                    } else if (this.random < .50) {
                        this.y += this.dy;
                        this.x += 2;
                    } else if (this.random < .75) {
                        this.y += 2;
                        this.x += .5;
                    } else {
                        this.y -= 2;
                        this.x += .5;
                    }
                    
                    if (this.count === this.howOften) {
                        smokeArry.push(new Smoke(this.x, this.y));
                        this.count = 0
                    }
                    this.radius -=.08;
                    this.count += 1;
                    this.draw();
                }
            }    
        }


        //////////////////////////// Smoke for exploded ships ///////////////////////


        function Smoke(x, y) {
            this.x = x;
            this.y = y;
            this.dx = 5;
            this.dy = .2;
            this.radius = 7;
            this.rotate = 180;
            this.opacity = 1;
            this.random = Math.random();
            
            this.draw = function() {
                cc.save();
                cc.beginPath();
                cc.fillStyle = `rgba(84, 84, 84, ${this.opacity})`;
                cc.strokeStyle= `rgba(84, 84, 84, ${this.opacity})`;
                cc.arc(this.x - 35, this.y + 5, this.radius, 0, 2 * Math.PI);
                cc.fill();
                cc.stroke();
                cc.restore();
                cc.closePath();
            }
            
            this.update = function() {
                if (this.opacity < 0.1) {
                    return;
                } else {
                    this.opacity -=.04;
                    this.radius +=.25;
                    this.draw();
                }
            }
        }


        ///////// Number of enemy ships, order, speed, and directions for them ////////////////////


        function addEnemyShip(count) {
            let enemy1 = document.getElementById('enemy1');
            let enemy2 = document.getElementById('enemy2');
            let enemy3 = document.getElementById('enemy3');
            let enemy4 = document.getElementById('enemy4');
            let enemy5 = document.getElementById('enemy5');
            let enemys = [enemy1, enemy2, enemy3, enemy4, enemy5];
            if (!pauseGame) {
                
                if (count > 0) {
                    let radius = 60;//Math.random() * 60 + 40;
                    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
                    let y = -40;
                    let dx = (Math.random() - 0.5 + 2);
                    let dy = Math.random() * 4 + 2;
                    let randomEnemy = Math.floor(Math.random() * Math.floor(5));
                    let changeDirection = Math.random();

                    if (changeDirection < 0.5) {
                        dx = -dx;
                    }       
                    if (x < 0) {
                        x = x + radius
                    } else if (x + radius > window.innerWidth) {
                        x = x - 60;
                    }
                    setTimeout(function() {
                        circleArray.push(new EnemyShip(x, y, dx, dy, radius, radius, enemys[randomEnemy]));
                        addEnemyShip(number);
                        if (speed > 400) {
                            speed = speed - 9;
                        }
                    }, speed)
                    
                    
                    number = number - 1;
                    
                } else {
                    return;
                }
            } else {
                return;
            }
        }
        setTimeout(() => addEnemyShip(number), 3500);  //3500


        //////////////////// Ship ////////////////////


        const char = {
            mainShip: document.getElementById('theShip'),
            x: window.innerWidth / 2,
            y: window.innerHeight - 0, // y: window.innerHeight - 120,
            dx: mouse.x,
            width: 100,
            height: 100,
            name: 'ship',
            rot: 20,
            //normal ship function
            draw: function() {
                cc.save();
                cc.beginPath();
                cc.globalAlpha=1.0;
                cc.drawImage(this.mainShip, this.x, this.y, this.width, this.height);
                cc.strokeStyle = 'blue';
                cc.stroke();
                cc.fill();
                cc.closePath();
                cc.restore();
            },
            //ship crashing function
            die: function() {
                cc.save();       
                cc.beginPath();
                cc.globalAlpha=1.0;
                cc.translate(this.x + (this.width/2),this.y + (this.height /2));
                cc.rotate(this.rot*Math.PI/180);
                cc.translate(-this.x - (this.width/2),-this.y - (this.height /2));
                cc.drawImage(this.mainShip, this.x, this.y, this.width, this.height);
                cc.translate(this.x,this.y);
                cc.strokeStyle = 'blue';
                cc.stroke();
                cc.fill();  
                cc.closePath();  
                cc.restore();
            },
            update: function() {
                

                if (health === 0) {
                    this.y = this.y + 8;
                    this.rot +=7;
                    this.die();
                } else if (this.y > window.innerHeight - 120) {
                    this.y = this.y - 5;
                    this.draw();
                } else {
                    this.x = mouse.x - 50;
                    this.draw();
                }
            }
        }


        //////////////////// Ship hitbox ////////////////////


        const charHitbox = {
            x: window.innerWidth / 2,
            y: window.innerHeight - 90,
            dx: mouse.x,
            width: 70,
            height: 60,
            name: 'ship',
            
            draw: function() {
                cc.save();
                
                cc.beginPath();
                cc.globalAlpha=1.0;
                cc.strokeStyle = 'blue';
                cc.stroke();
                cc.closePath();
                cc.restore();
            },
            update: function() {
                if (health === 0 ) {
                    this.x = this.x;
                    this.y = this.y + 500;
                } else {
                    this.x = mouse.x - 36;
                }
                
                this.draw();
            
                
            }
        }


        //////////////////// Laser ////////////////////


        function Laser(x, y, dy, width, height, enemy) {
            this.x = x;
            this.y = y;

            this.dy = dy;
            this.width = width;
            this.height = height;
            this.enemy = enemy;
            
            this.draw = function() {
                cc.save();
                
                cc.beginPath();
                cc.globalAlpha=0.8;
                cc.drawImage(this.enemy, this.x, this.y, this.width, this.height);
                cc.strokeRect(this.x, this.y, this.radius, this.radius); //draw box radius
                cc.strokeStyle = 'yellow';           
                cc.stroke();
                cc.fill();
                cc.closePath();       
                cc.restore();
                
                
            }
            
            this.update = function() { 
                this.y += -this.dy;
                this.draw();
            }
        }


        //////////////////// Fire laser ////////////////////
    
        function shoot() {
            let laserbeams = document.getElementById('laserbeam');
            if (!firstShot) {
                firstShot = true;
            }
            if (!reloading) {
                //laser.pause();
                laser.currentTime = 0;
                laser.play();
                reloading = true;
                laserFired.push(new Laser(mouse.x - 40, window.innerHeight - 80, 35, 5, 40, laserbeams));
                laserFired.push(new Laser(mouse.x + 32, window.innerHeight - 80, 35, 5, 40, laserbeams));
                reload();
                setTimeout(function() {
                    reloading = false;
                },390) // 390
            } else {
                return;
            }   
        };
        

        //////////////////// ReloadBar function ////////////////////


        function reload() {
            const reloadBar = document.getElementById("myBar");   
            let width = 0;
            let id = setInterval(frame, 1);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                } else {
                    width = width + 2; 
                    reloadBar.style.width = width + '%'; 
                }
            }
        }


        //////////////////// Get distance of Objs to determine hit ////////////////////


        function getDistance (objA, objB) {
            let hitBoxResizerA = 2;
            let hitBoxResizerB = 2;
            return !((objA.x - hitBoxResizerA) + (objA.width - hitBoxResizerA) < (objB.x - hitBoxResizerB) ||
                    (objB.x - hitBoxResizerB) + (objB.width - hitBoxResizerB) < (objA.x - hitBoxResizerA) ||
                    (objA.y - hitBoxResizerA) + (objA.height - hitBoxResizerA) < (objB.y - hitBoxResizerB) ||
                    (objB.y - hitBoxResizerB) + (objB.height - hitBoxResizerB) < (objA.y - hitBoxResizerA));
        };


        //////////////////// Score counter ////////////////////
        

        function keepScore() {
            const scoreElm = document.getElementById('score');
            scoreElm.innerHTML = "Score: " + (score + 100);
            score = score + 100;
        }


        //////////////////// Health ////////////////////


        function loseHealth() {
            if (health === 0) {
            } else {
                let hearts = document.getElementById('heart' + health);
                hearts.style.display = "none";
                health--;
            }  
        }


        //////////////////// Pause Game/Resume game canvas listeners ////////////////////


        document.onkeydown = function(evt) {
            if(!self.state.youLost) {
                if (evt.keyCode === 27) {
                
                    if (!pauseGame) {           
                        pauseGame = true;
                        holdNum = speed;
                    } else {
                        pauseGame = false;
                        speed = holdNum;
                        animates();
                        clearTimeout(timer);
                        timer = window.setTimeout(function () {
                            addEnemyShip(number);
                        }, 1000);       
                    }
                }
            } else {
                return;
            }
            
        };

        document.onclick = function(evt) {
            if(!self.state.youLost) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    if (!pauseGame && evt.target.id !== 'retry') {           
                        pauseGame = true;
                        holdNum = speed;
                    } else {
                        if (evt.target.id === 'resume') {
                            self.setState({pauseGame: false});
                            unPause.pause();
                            unPause.currentTime = 0;
                            unPause.play();
                            speed = holdNum;
                    pauseGame = false;
                        animates();
                        clearTimeout(timer);
                        timer = window.setTimeout(function () {
                            addEnemyShip(number);
                        }, 1000);  
                        } else {
                            return;
                        }
                    }
                
                } else if (evt.target.id === 'resume') {
                    self.setState({pauseGame: false});
                    unPause.pause();
                    unPause.currentTime = 0;
                    unPause.play();
                    pauseGame = false;
                        animates();
                        clearTimeout(timer);
                        timer = window.setTimeout(function () {
                            addEnemyShip(number);
                        }, 1000);  
                }
            } else {
                return;
            }
        }
        


        //////////////////// Animation //////////////////// 


        function animates () {

            //pause or unpause animates when game paused or unpaused
            if (!pauseGame) {
                requestAnimationFrame(animates);
            }
            

            //check to fire the laser method or not
            if (makeItRain) {
                shoot();
            }

            //change game size to fit screen when screen resized
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                gameCanvas.width = window.innerWidth;
                gameCanvas.height = window.innerHeight;
            }
            
            //clear canvas before redrawing imgs on canvas
            cc.clearRect(0, 0, window.innerWidth, window.innerHeight);
            
            //animate main ship
            char.update();
            
            //cycle through enemy ships in array to animate them
            for (let i = 0; i < circleArray.length; i++) {

                //updating each enemy ship call
                circleArray[i].update();

                //finding index in array of enemy ship that got hit
                let destroyEnemy = circleArray.indexOf(circleArray[i]);
                
                // if enemy ship already hit do nothing else do a number of things
                if (circleArray[destroyEnemy].exploded) {
                    //console.log("this happended")
                } else {
                
                    //determine if enemy ship hit the ground
                    if (circleArray[i].y + circleArray[i].height > window.innerHeight) {
                        //console.log('lost')
                        //this.startGame('lost');
                    }
                    
                    //determine if enemy ship hit main ship
                    if (getDistance(circleArray[i], charHitbox)) {
                        //change ship to exploded
                        circleArray[destroyEnemy].exploded = true;
                        circleArray[destroyEnemy].x = circleArray[destroyEnemy].x + 50;
                        debrisArry.push(new Debris(circleArray[destroyEnemy].x, circleArray[destroyEnemy].y));
                            debrisArry.push(new Debris(circleArray[destroyEnemy].x, circleArray[destroyEnemy].y));
                            debrisArry.push(new Debris(circleArray[destroyEnemy].x, circleArray[destroyEnemy].y));
                            debrisArry.push(new Debris(circleArray[destroyEnemy].x, circleArray[destroyEnemy].y));
                        //console.log('ship hit');
                        circleArray[destroyEnemy].explosion();
                        
                        // lose health to main ship when hit by enemy ship
                        loseHealth();
                        if (health === 0) {
                            lost.play();
                            lost.volume = 0.03;
                            self.setState({youLost: true});
                            //pauseGame = true;
                            setTimeout(() => pauseGame = true, 200);
                        }
                    }
                    
                    //determine if enemy ship hit the ground
                    if (circleArray[i].y > window.innerHeight) {
                        circleArray[destroyEnemy].explosion();
                        circleArray[destroyEnemy].exploded = true;
                        circleArray[destroyEnemy].x = circleArray[destroyEnemy].x + 50;
                        debrisArry.push(new Debris(circleArray[destroyEnemy].x, circleArray[destroyEnemy].y));
                            debrisArry.push(new Debris(circleArray[destroyEnemy].x, circleArray[destroyEnemy].y));
                            debrisArry.push(new Debris(circleArray[destroyEnemy].x, circleArray[destroyEnemy].y));
                            debrisArry.push(new Debris(circleArray[destroyEnemy].x, circleArray[destroyEnemy].y));
                        //this.startGame('end');
                        lost.play();
                        lost.volume = 0.03;
                        pauseGame = true;
                        self.setState({youLost: true});
                        
                    }

                    //if laser was fired then check if laser hits a enemy ship
                    if (firstShot) {
                        for (let k = 0; k < laserFired.length; k++) {
                        let destroyLaser = laserFired.indexOf(laserFired[k]);
                        //console.log('laser was fired');
                        if (getDistance(circleArray[i], laserFired[k])) {
                            //ship hit removes laser
                            laserFired[destroyLaser].update = function() {this.y = -500; this.x = -500; this.draw()};
                            //adds points to score method
                            keepScore();
                            //changes enemy ship to exploding animation
                            circleArray[destroyEnemy].exploded = true;
                            // adds direction to explostion
                            circleArray[destroyEnemy].x = circleArray[destroyEnemy].x + 10;
                            debrisArry.push(new Debris(circleArray[destroyEnemy].x + 30, circleArray[destroyEnemy].y));
                            debrisArry.push(new Debris(circleArray[destroyEnemy].x + 30, circleArray[destroyEnemy].y));
                            debrisArry.push(new Debris(circleArray[destroyEnemy].x + 30, circleArray[destroyEnemy].y));
                            debrisArry.push(new Debris(circleArray[destroyEnemy].x + 30, circleArray[destroyEnemy].y));
                            circleArray[destroyEnemy].explosion();
                            
                        }
                    }
                    }
                }
            }
            //animates debris in debris array
            for (let a = 0; a < debrisArry.length; a++) {
                debrisArry[a].update();
            }
            //animates smoke in smoke array
            for (let b = 0; b < smokeArry.length; b++) {
                smokeArry[b].update();
            }

            

            //if laser fired calls update on it to redraw it
            if (firstShot) {
                for (let j = 0; j< laserFired.length; j++) {
                    laserFired[j].update();
                }
                
            }

            // updates main ships hitbox
            charHitbox.update();
        }
        
        // starts animation
        animates();
        document.getElementById("game").addEventListener('touchstart', function(e){
            e.preventDefault()
        })
}


//////////////////// Render Game ////////////////////
  

    render() {
        //text displayed for computers
        let menuText = 'Press ESC for menu';
        let instructions = <p id="instructions" className={classes.Instructions}>Move mouse to fly and click to fire. Get ready!</p>
        //if mobile device then texts are changed for those devices
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            menuText = 'Menu';
            instructions = <p id="instructions" className={classes.Instructions}>Drag finger to fly and shoot. Get ready!</p>;
        }

        
        
        return (
            <div id="GameTab" className={classes.GameTab} onKeyDown={(e) => this.changePauseHandler(e)} tabIndex="0">
                <canvas className={classes.GameCanvas} onClick={() => this.fireIt()}  id="game" onMouseMove={(e) => this.mouseMove(e)} ></canvas>
                <h4 id="mobilePause" onTouchStart={(e) => this.changePauseHandler(e)} className={classes.PauseMenu}>{menuText}</h4>
                <img src={heart} alt="heart life in game" id="heart1" className={classes.Heart1} />
                <img src={heart} alt="heart life in game" id="heart2" className={classes.Heart2} />
                <img src={heart} alt="heart life in game" id="heart3" className={classes.Heart3} />
                <h3 id="score" className={classes.Score}>Score: 0</h3>
                <div style={{display: window.innerWidth < 800 ? 'none' : ''} } className={classes.MyProgress}>
                    <div id="myBar" className={classes.MyBar}></div>
                </div>
                <div className={this.state.pauseGame ? [classes.Paused, classes.PausedAnimateIn].join(' ') : [classes.Paused, classes.PausedAnimateOut].join(' ')} >
                    <h2>Menu</h2>
                    <h3 id="resume" onClick={(e) => this.changePauseHandler(e)}>Resume game</h3>
                    <h3 onClick={this.props.returnHome}>Exit game</h3>
                </div>
                <div className={this.state.youLost ? [classes.Lost, classes.LostAnimateIn].join(' ') : [classes.Lost, classes.LostAnimateOut].join(' ')} >      
                    <h2>GAME OVER</h2>
                    <div className={classes.FinalScore}> 
                        <h2  id="score">Score:   {score}</h2>
                    </div>
                    <h3 id='retry' onClick={() => {this.start()}} >Retry?</h3>
                    <h3 onClick={this.props.returnHome}>Exit game</h3>
                </div>
                <div className={classes.backDrop} style={{display: this.state.pauseGame || this.state.youLost ? '' : 'none'}}></div>
                {instructions}
                <img className={classes.hideImgs} alt="Your ship in game" id="theShip" src={main} />
                <img className={classes.hideImgs} alt="enemy ship in game" id="enemy1" src={enemy1} />
                <img className={classes.hideImgs} alt="enemy ship in game" id="enemy2" src={enemy2} />
                <img className={classes.hideImgs} alt="enemy ship in game" id="enemy3" src={enemy3} />
                <img className={classes.hideImgs} alt="enemy ship in game" id="enemy4" src={enemy4} />
                <img className={classes.hideImgs} alt="enemy ship in game" id="enemy5" src={enemy5} />
                <img className={classes.hideImgs} alt="enemy ship in game" id="laserbeam" src={laserbeam} />
                
            </div>
        );
    }
}

export default Game;