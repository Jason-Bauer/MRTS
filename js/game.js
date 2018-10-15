var Game = {};
var testKey,player2base,lane,spawnLane1Key,spawnLane2Key, player1base, overlay,canvas,buttonSpawn;
var removeElement, player1Group, player2Group, laneGroup;
var playerSprite;
let player1unit,player2unit;
var player1CollisionGroup,player2CollisionGroup;
var timer;
var key;
var combatMovement ={
    move:0,
    attack:1,
}
var cost = {
    butter:"1,b",
    flour:"1,f",
    sugar:"1,s",
    oil:"1,o",
    milk:"1,m",
    water:"1,w",
    heat:"1,h",
    cold:"1,c",
    cracker:"1,f,1,o",
    bread:"1,f,1,w,1,o,1,h",
    lavaCake:"1,h,1,b,1,s",
    cupCake:"1,f,1,m,1,s,1,b",
    monstrosity:"1,b,1,f,1,s,1,o,1,m,1,w,1,h,1,c",
    iceWater:"1,w,1,c",
    milkTea:"1,w,1,h,1,m",
    butterMilk:"1,m,1,b,1,c",
}

var resource = {
    butter:0,
    flour:0,
    sugar:0,
    oil:0,
    milk:0,
    water:0,
    heat:0,
    cold:0,
}

var combat = {
    waitTime:0.5,
    attackDmg:1,
    health:20,
    range:1,
    speed:1,
    cost: ['b'],
    decision:combatMovement.move,
}

Game.init = function(){
    game.stage.disableVisibilityChange = true;
    playerSprite = ["butter.png","cold.png"];
};

Game.preload = function() {
    game.load.image('player1base','assets/sprites/base.png');
    game.load.image('player2base','assets/sprites/base.png');
    game.load.image('lane','assets/sprites/lane.png');
    
    game.load.image('butter.png','assets/sprites/butter.png');
    game.load.image('cold.png','assets/sprites/cold.png');
    game.load.image('flour.png','assets/sprites/flour.png');
    game.load.image('hot.png','assets/sprites/hot.png');
    game.load.image('Milk.png','assets/sprites/Milk.png');
    game.load.image('oil.png','assets/sprites/oil.png');
    game.load.image('Sugar.png','assets/sprites/Sugar.png');
    game.load.image('water.png','assets/sprites/water.png');
    
    game.stage.disableVisibilityChange = true;
};

Game.create = function(){
    
    key = Object.keys(resource);
  
    game.physics.startSystem(Phaser.Physics.P2JS);
  
    game.physics.p2.setImpactEvents(true);
  
    game.physics.p2.gravity.y = 0;
  
    Game.playerMap = {};
    testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    spawnLane1Key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    spawnLane2Key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    spawnLane3Key = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    
    removeElement = game.add.group();
    player1Group = game.add.group();
    player2group = game.add.group();
    laneGroup = game.add.group();
    
    player1base = player1Group.create(187, 375, 'player1base');
    player1base.combat = {...combat, health:10,speed:0,    waitTime:100,
    attackDmg:0,
    range:1,
    speed:1,
    };
    player1base.resource = {...resource};
    player2base = player2group.create(window.innerWidth-187, 375, 'player2base');
    player2base.combat = {...combat, health:10,speed:0,    waitTime:100,
    attackDmg:0,
    range:1,
    speed:1,
    };
    player2base.resource = {...resource};
    testKey.onDown.add(Client.sendTest, this);
    spawnLane1Key.onDown.add(Client.spawnLane1, this);
    spawnLane2Key.onDown.add(Client.spawnLane2, this);
    spawnLane3Key.onDown.add(Client.spawnLane3, this);
    
    player1base.inputEnabled = true;
    player1base.events.onInputDown.add(listener, this);
  
    game.physics.p2.enable( [ player1base, player2base ]);
    console.dir(player1base.body);
    player1base.body.static = true;
    player2base.body.static = true;
    
    player1CollisionGroup = game.physics.p2.createCollisionGroup();
    player2CollisionGroup = game.physics.p2.createCollisionGroup();
    
    player1base.body.setCollisionGroup(player1CollisionGroup);
    player2base.body.setCollisionGroup(player2CollisionGroup);
    
    player1base.body.collides([player1CollisionGroup, player2CollisionGroup]);
    player2base.body.collides([player1CollisionGroup, player2CollisionGroup]);
    
    
    overlay = document.querySelector('.b1');
    overlay.addEventListener('click',function(e){
        document.querySelector('.b1-overlay').style.display = "none";
        document.querySelector('.inventory-overlay').style.display = "block";
    });
    
    canvas = document.querySelector('canvas');
    canvas.addEventListener('click',function(e){
        document.querySelector('.b1-overlay').style.display = "block";
        document.querySelector('.inventory-overlay').style.display = "none";
    });
    
    buttonSpawn = document.querySelectorAll('.slot');
    for(var i=0;i<buttonSpawn.length;i++){
        buttonSpawn[i].addEventListener('click',function(e){
        console.dir(this.value);
        //playerSprite[0] = this.value;
        Client.setEnemySprite(this.value);
    });
    }

    
    
    
    
    Client.askNewPlayer();
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

function listener () {
    
}

function updateResource() {

    for(var i =0;i<key.length;i++){
        player1base.resource[key[i]] += 2;
        player2base.resource[key[i]] += 2;
    }
}

Game.addNewPlayer = function(id){

    lane = laneGroup.create(10, 20, 'lane');
    lane.scale.setTo(0.7, 0.8);
    this.world.bringToTop(player1Group);
    this.world.bringToTop(player2group);
    
        timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(2000, updateResource, this);
    
    timer.start();

};

Game.addNewUnit = function(playerNum,x,y){
    if(playerNum == 0){

        var xx = cost[playerSprite[0].slice(0, -4)];
        var yy = xx.split(",");
        
        
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        var resourceTypes = [];
        var resourceValues = {...resource};
        
        for(var i =0;i<yy.length;i++){
            if (i % 2 == 0) {
                resourceTypes.push(yy[i]);
            } else {
                resourceValues.push(yy[i]);
            }
        }
        
        for(var i =0; i<resourceTypes.length;i++){
            switch(resourceTypes){
                case "b":
                    
                    break;
                case "f":
                    break;
                case "s":
                    break;
                case "o":
                    break;
                case "m":
                    break;
                case "w":
                    break;
                case "h":
                    break;
                case "c":
                    break;
            }
        }
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        /////////////////////////// FK THIS //////////////////////////////////////
        
        
        //if(player1base.resource[playerSprite[0]..slice(0, -4)]);
        player1unit = player1Group.create(x, y, playerSprite[0]);
        switch(playerSprite[0]){
            case "butter.png": 
                player1unit.combat = {...combat, health:6,speed:6 };
                break;
            case "flour.png": 
                player1unit.combat = {...combat, attack:3,speed:2 };
                break;
            case "Sugar.png": 
                player1unit.combat = {...combat, attack:2,speed:8 };
                break;
            default:
                player1unit.combat = {...combat};
                break;
        }
        
        player1unit.scale.setTo(0.25, 0.25);
        game.physics.p2.enable(player1unit);
        player1unit.enableBody = true;
        player1unit.physicsBodyType = Phaser.Physics.P2JS;
        player1unit.body.data.gravityScale = 0.0;
        player1unit.body.data.damping = 0.0;
        player1unit.body.data.fixedY = true;
        player1unit.body.data.fixedX = false;
        player1unit.body.fixedRotation = true;
        player1unit.body.velocity.x = 10*player1unit.combat.speed;
        player1unit.body.velocity.y = 0;
        player1unit.body.setCollisionGroup(player1CollisionGroup);

        player1unit.body.collides(player2CollisionGroup, hitUnit, this);
        
    }
    else{
        player2unit = player2group.create(window.innerWidth-x, y, playerSprite[1]);
        switch(playerSprite[1]){
            case "butter.png": 
                player2unit.combat = {...combat, health:2,speed:6 };
                break;
            case "flour.png": 
                player2unit.combat = {...combat, attack:3,speed:2 };
                break;
            case "Sugar.png": 
                player2unit.combat = {...combat, attack:2,speed:8 };
                break;
            default:
                player2unit.combat = {...combat};
                break;
            
        }
        player2unit.combat.speed *= -1;
        console.dir(player2unit);
        player2unit.scale.setTo(0.25, 0.25);
        game.physics.p2.enable(player2unit);
        player2unit.enableBody = true;
        player2unit.physicsBodyType = Phaser.Physics.P2JS;
        player2unit.body.data.gravityScale = 0.0;
        player2unit.body.data.damping = 0.0;
        player2unit.body.data.fixedY = true;  
        player2unit.body.data.fixedX = false; 
        player2unit.body.fixedRotation = true;
        player2unit.body.velocity.x = 10*player2unit.combat.speed;
        player2unit.body.setCollisionGroup(player2CollisionGroup);

        player2unit.body.collides(player1CollisionGroup, hitUnit, this);
        

    }

            
            
};

Game.ChangeUnit = function(spriteName,playerNum){
    console.dir(playerSprite);
    playerSprite[playerNum] = spriteName;
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.update = function(){
}

/*Game.dropHandler = function() {
    if(removeElement.length > 100){
        for(var i=0;i<removeElement.length;i++){
        //  Remove the item from the Group.
        removeElement.remove(removeElement[i]);
        }

    }


}*/

function hitUnit(body1, body2) {
    console.log("hit");
    console.dir(body1);
    console.dir(body2);
    for(var i = 0;i<player2group.length;i++){
        console.log("SAFASF");
        console.dir(player2group);
    }

    body1.sprite.combat.decision = combatMovement.attack;
    if(body1.sprite.combat.decision == combatMovement.attack ){
        body1.data.velocity = [0,0];
        //body1.velocity.destination = [0,0];
        body1.static = true;
            //  Set a TimerEvent to occur after 2 seconds
        //timer.loop(1000*body1.sprite.combat.waitTime, damageCalculation(body1,body2), this);
        game.time.events.add(1000*body1.sprite.combat.waitTime, damageCalculation,this,body1,body2);
    }


}

function damageCalculation(body1,body2) {
    

    console.dir(":)");
    console.dir(body2);
    console.dir(body1);
    if(body2.sprite.combat.health <= 0 || !body2){
        body2.sprite.pendingDestroy = true;
        body2.removeNextStep = true;
        body1.sprite.combat.decision = combatMovement.move;
        body1.static = false;
        body1.data.inertia = 0;
        body1.data.velocity = [-10*body1.sprite.combat.speed,0];
        
        console.dir(body1.sprite.combat.speed);
        return;
    }
    body2.sprite.combat.health -= body1.sprite.combat.attackDmg;
    console.log("curr enemy health: " + body2.sprite.combat.health);
    if(body1.sprite.combat.health > 0){
        game.time.events.add(1000*body1.sprite.combat.waitTime, damageCalculation,this,body1,body2);
    }
    
}