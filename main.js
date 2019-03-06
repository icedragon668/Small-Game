let myGamePiece;

function startGame() { //start and bits, how can i draw a map though?
    myGameArea.start()
    myGamePiece = new component(75, 75, "rgba(255, 0, 255, 1)", 100, 100);
    obstacles = [
        redGamePiece = new component(75, 75, "red", 10, 10),
        yellowGamePiece = new component(75, 75, "yellow", 10, 100),
        blueGamePiece = new component(75, 75, "blue", 100, 10),
        myObstacle = new component(10, 200, "green", 300, 120),
    ]
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

let myGameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        // this.canvas.width = window.innerWidth;
        // this.canvas.height = (window.innerHeight - 10);
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = 500;

        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(updateGameArea, 20)
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
        /* mouse listener
            window.addEventListener('mousemove', function (e) {
                myGameArea.x = e.pageX;
                myGameArea.y = e.pageY;
            })
        */
        /* touch listener
            window.addEventListener('touchmove', function (e) {
             myGameArea.x = e.touches[0].screenX;
             myGameArea.y = e.touches[0].screenY;
             })
         */
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    // stop : function() { // this sets the interval to 0, thus "stopping" by no longer updating
    //     clearInterval(this.interval);
    // }
    stop: function () { // hopefully this just stops the movement
        // stopMove();
        myGamePiece.x = myGamePiece.x - myGamePiece.speedX
        myGamePiece.y = myGamePiece.y - myGamePiece.speedY
    }
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

function updateGameArea() {
    myGameArea.clear()
    // if (myGamePiece.crashWith(obstacles)) { // hhmm...
    //     myGameArea.stop();
    //   }
    for (i = 0; i < obstacles.length; i += 1) {
        if (myGamePiece.crashWith(obstacles[i])) {
            myGameArea.stop();
        } }
        //    else {
        // myGamePiece.x += 1;
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        if (myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -1; }
        if (myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = 1; }
        if (myGameArea.keys && myGameArea.keys[38]) { myGamePiece.speedY = -1; }
        if (myGameArea.keys && myGameArea.keys[40]) { myGamePiece.speedY = 1; }
        /* mouse/touch listener
          if (myGameArea.x && myGameArea.y) {
            myGamePiece.x = myGameArea.x;
            myGamePiece.y = myGameArea.y; 
            }
        // https://www.w3schools.com/graphics/game_controllers.asp
        // has drawn buttons as well
        */
        myObstacle.update()
        myGamePiece.newPos();
        myGamePiece.update()
        redGamePiece.update();
        yellowGamePiece.update();
        blueGamePiece.update();
        //} // the "if" }
    }

    function moveup() {
        myGamePiece.speedY -= 1;
    }

    function movedown() {
        myGamePiece.speedY += 1;
    }

    function moveleft() {
        myGamePiece.speedX -= 1;
    }

    function moveright() {
        myGamePiece.speedX += 1;
    }
