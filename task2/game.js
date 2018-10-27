const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
canvas.width = 1000
canvas.height = 700
context.fillStyle = 'black'
context.fillRect(0, 0, canvas.width, canvas.height)
let gameEnded = false;
const rand = function(num) {
    return Math.floor(Math.random() * num) + 1;
};

const background = new Image();
background.src = 'https://pre00.deviantart.net/d56a/th/pre/f/2015/285/5/5/hs2_by_spongekid1999-d9cxizj.png';
const goodGuyImg = new Image();
goodGuyImg.src = 'https://vignette.wikia.nocookie.net/phineasandferb/images/7/77/Baljeet1.png/revision/latest?cb=20121222065526';
const badGuyImg = new Image();
badGuyImg.src = 'http://origin.lcv.org/wp-content/uploads/2018/01/f-grade.png';

const gameData = {
    hero: {
        x: 200,
        y: 600,
        xDelta: 0,
        yDelta: 0,
        width: 150,
        height: 150,
        image: goodGuyImg,
        draw: function() {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);

        },

        update: function() {
            for (let i = 0; i < gameData.badGuys.length; i++) {

                let bd = gameData.badGuys[i];


                if (Math.abs(this.x + this.width/2 -(bd.x + bd.width/2)) <= this.width/2 + bd.width/2 && 
                    Math.abs(this.y + this.height/2 -(bd.y + bd.height/2)) <= this.height/2 + bd.height/2){
                    alert("Oooooppppsss, you failed a course :(,:(,:(");
                    gameEnded = true;
                    
                }   
            }


        
            this.x += this.xDelta;
            this.y += this.yDelta;

        }
    },
    badGuys: []
};

for (let i = 0; i < 3; i++) {
    gameData.badGuys[i] = {
        x: rand(500),
        y: rand(500),
        xDelta: rand(6),
        yDelta: rand(5),
        width: 70,
        height: 70,
        image: badGuyImg,
        draw: function() {

            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        },

        update: function() {
            if (this.x < 0 || this.x > canvas.width - this.width) {
                this.xDelta *= -1
            }

            if (this.y < 0 || this.y > canvas.height - this.height) {
                this.yDelta *= -1
            }


            this.x += this.xDelta;
            this.y += this.yDelta;
        }
    }
}
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
document.addEventListener('keydown', function(event) {
    if (event.keyCode === rightKey) {
        gameData.hero.xDelta = 10
    }
      if (event.keyCode === leftKey) {
        gameData.hero.xDelta = -10
    }
     if (event.keyCode === upKey) {
        gameData.hero.yDelta = -10
    }
     if (event.keyCode === downKey) {
        gameData.hero.yDelta = 10
    }
}, false);
document.addEventListener('keyup', function(event) {
      if (event.keyCode === rightKey) {
        gameData.hero.xDelta = 0
    }
      if (event.keyCode === leftKey) {
        gameData.hero.xDelta = 0
    }
     if (event.keyCode === upKey) {
        gameData.hero.yDelta = 0
    }
     if (event.keyCode === downKey) {
        gameData.hero.yDelta = 0
    }
}, false);


const draw = function() {
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gameData.badGuys.length; i++) {
        gameData.badGuys[i].draw();
        gameData.hero.draw();
    };


};

const update = function() {
    for (let i = 0; i < gameData.badGuys.length; i++) {
        gameData.badGuys[i].update();
    }

    gameData.hero.update();



};


const loop = function() {


    draw();


    update();

    if(!gameEnded){
        requestAnimationFrame(loop);    
    }
    
};

loop();