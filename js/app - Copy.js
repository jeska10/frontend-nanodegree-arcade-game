// collision detection between player and enemies
var  checkCollisions = function() {
    var playerLeft = player.x;
    var playerRight = player.x + 99;
    var playerTop = player.y;
    var playerBottom = player.y + 82;

    // only check for a collision if we are in the road way
    if (playerBottom <= 322 && playerTop > 72) {
        //check to see if we have a collision with an enemy
        //console.log("left " + playerLeft + " right " + playerRight + " top " + playerTop + " bottom " + playerBottom);
        for (i=0; i < allEnemies.length; i++) {
            console.log("here");
            var enemyLeft = allEnemies[i].x;
            var enemyRight = allEnemies[i].x + 99;
            var enemyTop = allEnemies[i].y;
            var enemyBottom = allEnemies[i].y + 82;                

            if (!(playerRight < enemyLeft || 
                  playerLeft > enemyRight ||
                  playerBottom < enemyTop || 
                  playerTop > enemyBottom)) {

                      player.x = 201;
                      player.y = 405;
                      player.nextx = 201;
                      player.nexty = 405;
                      break;
            }
        }
    }
}

// Enemies our player must avoid
var Enemy = function(locx,locy,speed) {
    // Variables applied to each of our instances go here,
    var obj = Object.create(Enemy.prototype);
    obj.x = locx; 
    obj.y = locy;  
    obj.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    obj.sprite = 'images/enemy-bug.png';
    return obj; 
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var x;
    var y;

    if (this.x == 0) {
        this.x = 1;
    }
    x = this.x;
    y = this.y;

    if (x < 505)  {
        this.x = this.x + this.speed + (dt * this.speed);
    }
    else {
        this.x = 0;

        switch (Math.ceil(Math.random() * 3)) {
            case 1: this.y = 60;
                    break;
            case 2: this.y = 145;
                    break;
            case 3: this.y = 225;
                    break;
            default: 60;
        }
    }

    //check to see if we have a collision with another enemy
    /*for (i=0; i < allEnemies.length; i++) {
        if (allEnemies[i] != this) {
           //if () || (allEnemies[i].y == this.y) {
            if (allEnemies[i].x == this.x && allEnemies[i].y == this.y) {
                this.x = 105;
            }
        }        
    }*/
    // if the player is in the road way check for a collision with the enemy   
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
}

// This class requires an update(), render() and
// a handleInput() method.
// Our Player
var Player = function(locx,locy) {
    // Variables applied to each of our instances go here,
    var obj = Object.create(Player.prototype);
    obj.x = locx; 
    obj.y = locy; 
    obj.nextx = locx;
    obj.nexty = locy; 

    // The image/sprite for our Player
    obj.sprite = 'images/char-boy.png';
    return obj; 
}

Player.prototype.update = function() {
    var collision = 0;

    // if the player is in the road way check for a collision with the enemy
    /*if (y < 322 && y > 72) {
        var collision = checkCollisions(x,y);
        console.log('check for collision');
    }*/

    if (collision == 1) {
        // a collision was detected, so send player back to starting position
        this.x = 201;
        this.y = 405;
    }
    else {
        if (this.nextx < 505 && this.nextx > 0)  {
            this.x = this.nextx;
        }    


        if (this.nexty < -10) {
            this.y = 405;
        }
        else if (this.nexty < 450)  {
            this.y = this.nexty;
        } 
    }
}

// Draw the Player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    var x = 0;
    var y = 0;

    //find canvas location.. then check location before we increment if we are close to edge subtract and use the difference as the increment
    switch (key) {
        case 'up': y = this.y - 83;
                   x = this.x;
                   break;
        case 'down': y = this.y + 83;
                     x = this.x;
                     break;
        case 'left': x = this.x - 100;
                     y = this.y;
                     break;
        case 'right': x = this.x + 100;
                      y = this.y;
    }

    player.nextx = x;
    player.nexty = y;
    //player.update();
} 

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var burke = new Enemy(0,60,6);
var lila = new Enemy(85,145,4.5);
var mac = new Enemy(0,230,2.5);
var allEnemies = [burke, lila, mac];

var player = new Player(201,405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('click',function(e) {
    var x = e.pageX;
    var y = e.pageY;
    console.log('x location: ' + x + '; y location: ' + y);
});
