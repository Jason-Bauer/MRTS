var stats = {
  
  butter: {
    "att": 1,
    "health": 1,
    "speed": 6,
    "range": 1,
    "wait": 0.5,
    "type":"n",
  },
  
  flour: {
    "att": 2,
    "health": 2,
    "speed": 2,
    "range": 1,
    "wait": 0.5,
    "type":"n",
  },
  
  sugar: {
    "att": 2,
    "health": 1,
    "speed": 8,
    "range": 1,
    "wait": 0.5,
      "type":"n",
  },
  
  oil: {
    "att": 1,
    "health": 2,
    "speed": 3,
    "range": 4,
    "wait": 0.5,
      "type":"n",
  },
  
  milk: {
    "att": 2,
    "health": 1,
    "speed": 2,
    "range": 3,
    "wait": 0.5,
      "type":"n",
  },
  
  water: {
    "att": 1,
    "health": 1,
    "speed": 3,
    "range": 6,
    "wait": 0.5,
      "type":"n",
  },
  
  heat: {
    "att": 2,
    "health": 1,
    "speed": 4,
    "range": 4,
    "wait": 0.5,  
      "type":"n",
  },
  
  cold: {
    "att": 1,
    "health": 2,
    "speed": 2,
    "range": 4,
    "wait": 0.5,  
      "type":"n",
  },
  
  cracker: {
    "att": 2,
    "health": 10,
    "speed": 6,
    "range": 1,
    "wait": 0.5,
      "type":"s",
  },
  
  bread: {
    "att": 6,
    "health": 18,
    "speed": 4,
    "range": 1,
    "wait": 0.5,
      "type":"s",
  },
  
  lavaCake: {
    "att": 6,
    "health": 6,
    "speed": 6,
    "range": 1,
    "wait": 0.5,  
      "type":"m",
  },
  
  cupCake: {
    "att": 12,
    "health": 12,
    "speed": 4,
    "range": 1,
    "wait": 0.5,  
      "type":"m",
  },
  
  monstrosity: {
    "att": 11,
    "health": 11,
    "speed": 2,
    "range": 1,
    "wait": 0.5,
      "type":"n",
  },
  
  iceWater: {
    "att": 8,
    "health": 3,
    "speed": 7,
    "range": 6,
    "wait": 0.5,
      "type":"l",
  },
  
  milkTea: {
    "att": 18,
    "health": 6,
    "speed": 5,
    "range": 4,
    "wait": 0.5,
      "type":"l",
  },
  
  butterMilk: {
    "att": 2,
    "health": 1,
    "speed": 6,
    "range": 8,
    "wait": 0.5,
      "type":"n",
  },
    
  base : {
      "att": 10000,
    "health": 30,
    "speed": 0,
    "range": 0,
    "wait": 100000,
      "type":"b",
  },
  none : {
    "att": 0,
    "health": 1,
    "speed": 0,
    "range": 0,
    "wait": 10000,
      "type":"n",
  }
};

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, document.getElementById('game'));
game.state.add('Game',Game);
game.state.add('Lobby',Lobby);
game.state.add('Over',Over);
game.state.start('Game');

var ingredients = ["butter.png", "flour.png", "sugar.png", "oil.png", "milk.png", "water.png", "EmptyGlass.png"];

var solids = ["bread.png","cracker.png"];
var mixed = ["cupCake.png", "lavaCake.png"];
var liquid = ["milkTea.png", "iceWater.png"];

var ui = document.createElement('div');
ui.classList.add("js-overlay");
ui.classList.add("overlay");
ui.setAttribute('id', 'ui');

var buttonOverlay = document.createElement('div');
buttonOverlay.classList.add("b1-overlay");

var button1 = document.createElement('button');
button1.classList.add("b1");
var t1 = document.createTextNode("Ingredients");
button1.appendChild(t1);
buttonOverlay.appendChild(button1);

var button2 = document.createElement('button');
button2.classList.add("b2");
var t2 = document.createTextNode("Menu");
button2.appendChild(t2);
buttonOverlay.appendChild(button2);

ui.appendChild(buttonOverlay);

var InventoryOverlay = document.createElement('div');
InventoryOverlay.classList.add("inventory-overlay");

// ---------------- CREATES INGREDIENTS MENU ------------------------

buildSlot(ingredients, 0, 1);
buildSlot(ingredients, 2, 3);
buildSlot(ingredients, 4, 5);

function buildSlot (images, index1, index2) {
    
    var InventorySlot = document.createElement('div');
    InventorySlot.classList.add("inventory-slot");
    
    var slot1 = document.createElement('button');
    slot1.classList.add("slot");
    slot1.value = ingredients[index1];
    
    var img1 = document.createElement('img');
    img1.classList.add("img1");
    img1.src = "../assets/sprites/"+ingredients[index1];
    slot1.appendChild(img1);
    
    var resouceDP1 = document.createElement('div');
    resouceDP1.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP1.appendChild(t1);
    slot1.appendChild(resouceDP1);
    
    var slot2 = document.createElement('button');
    slot2.classList.add("slot");
    slot2.value = ingredients[index2];
    
    var img2 = document.createElement('img');
    img2.classList.add("img1");
    img2.src = "../assets/sprites/"+ingredients[index2];
    slot2.appendChild(img2);
    
    var resouceDP2 = document.createElement('div');
    resouceDP2.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP2.appendChild(t1);
    slot2.appendChild(resouceDP2);
    
    InventorySlot.appendChild(slot1);
    InventorySlot.appendChild(slot2);
    
    InventoryOverlay.appendChild(InventorySlot);
}

var InventorySlot = document.createElement('div');
InventorySlot.classList.add("inventory-slot");

var backDiv = document.createElement('div');
backDiv.classList.add("backDiv");
var backBtn = document.createElement('button');
backBtn.classList.add("backBtn");
var backText = document.createTextNode("\u21e6");
backBtn.appendChild(backText);
backDiv.appendChild(backBtn);
InventorySlot.appendChild(backDiv);
InventoryOverlay.appendChild(InventorySlot);
ui.appendChild(InventoryOverlay);

// ----------------------------------------------------------------------

// -------------------------- CREATES MENU OVERLAY ----------------------------------

var SpecialOverlay = document.createElement('div');
SpecialOverlay.classList.add("special-overlay");

buildSpecialSlot(solids, "Solids", "blue");
buildSpecialSlot(mixed, "Mixed", "purple");
buildSpecialSlot(liquid, "Liquid", "red");

function buildSpecialSlot(images, type, color) {
    
    var SpecialSlot = document.createElement('div');
    SpecialSlot.classList.add("special-slot");
    SpecialSlot.setAttribute("id", type);
    
    var label = document.createElement('p');
    label.innerHTML = type;
    label.classList.add("labelText");
        
    SpecialSlot.appendChild(label);
    
    var slot1 = document.createElement('button');
    slot1.classList.add("slot");
    slot1.value = images[0];
    
    var img1 = document.createElement('img');
    img1.classList.add("img1");
    img1.src = "../assets/sprites/"+images[0];
    slot1.appendChild(img1);
    
    var resouceDP1 = document.createElement('div');
    resouceDP1.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP1.appendChild(t1);
    slot1.appendChild(resouceDP1);
    
    
    var slot2 = document.createElement('button');
    slot2.classList.add("slot");
    slot2.value = images[1];
    
    var img2 = document.createElement('img');
    img2.classList.add("img1");
    img2.src = "../assets/sprites/"+images[1];
    slot2.appendChild(img2);
    
    var resouceDP2 = document.createElement('div');
    resouceDP2.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP2.appendChild(t1);
    slot2.appendChild(resouceDP2);
    
    
    SpecialSlot.appendChild(slot1);
    SpecialSlot.appendChild(slot2);
    
    SpecialOverlay.appendChild(SpecialSlot);
}

var backDiv = document.createElement('div');
backDiv.classList.add("backDiv");
var backBtn = document.createElement('button');
backBtn.classList.add("backBtn");
var backText = document.createTextNode("\u21e6");
backBtn.appendChild(backText);

backDiv.appendChild(backBtn);
SpecialOverlay.appendChild(backDiv);

// ---------------------------------------------------------------

var statsOverlay = document.createElement('div');
statsOverlay.classList.add("stats");

statsOverlay.style.top = "0px";
statsOverlay.style.left = window.innerWidth / 2 - 525 + "px";

var statsTitle = document.createElement('p');
statsTitle.classList.add("statsText");

statsOverlay.appendChild(statsTitle);

ui.appendChild(statsOverlay);

ui.appendChild(SpecialOverlay);

//document.getElementById('game').appendChild(ui);













var resourceOverlay = document.createElement('div');
resourceOverlay.classList.add("resourceOverlay");

var resourceTitle = document.createElement('div');
resourceTitle.classList.add("resourceText");

resourceOverlay.appendChild(resourceTitle);

var resourceTitle2 = document.createElement('div');
resourceTitle2.classList.add("resourceText");

resourceOverlay.appendChild(resourceTitle2);

var slot1 = document.createElement('div');
    slot1.classList.add("reSlot");
    slot1.value = ingredients[0];
    
    var img1 = document.createElement('img');
    img1.classList.add("img1");
    img1.src = "../assets/sprites/"+ingredients[0];
    slot1.appendChild(img1);
    
    var resouceDP1 = document.createElement('div');
    resouceDP1.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP1.appendChild(t1);
    slot1.appendChild(resouceDP1);
    
    var slot2 = document.createElement('div');
    slot2.classList.add("reSlot");
    slot2.value = ingredients[1];
    
    var img2 = document.createElement('img');
    img2.classList.add("img1");
    img2.src = "../assets/sprites/"+ingredients[1];
    slot2.appendChild(img2);
    
    var resouceDP2 = document.createElement('div');
    resouceDP2.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP2.appendChild(t1);
    slot2.appendChild(resouceDP2);

var slot3 = document.createElement('div');
    slot3.classList.add("reSlot");
    slot3.value = ingredients[2];
    
    var img3 = document.createElement('img');
    img3.classList.add("img1");
    img3.src = "../assets/sprites/"+ingredients[2];
    slot3.appendChild(img3);
    
    var resouceDP3 = document.createElement('div');
    resouceDP3.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP3.appendChild(t1);
    slot3.appendChild(resouceDP3);


var slot4 = document.createElement('div');
    slot4.classList.add("reSlot");
    slot4.value = ingredients[3];
    
    var img4 = document.createElement('img');
    img4.classList.add("img1");
    img4.src = "../assets/sprites/"+ingredients[3];
    slot4.appendChild(img4);
    
    var resouceDP4 = document.createElement('div');
    resouceDP4.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP4.appendChild(t1);
    slot4.appendChild(resouceDP4);
    
    var slot5 = document.createElement('div');
    slot5.classList.add("reSlot");
    slot5.value = ingredients[4];
    
    var img5 = document.createElement('img');
    img5.classList.add("img1");
    img5.src = "../assets/sprites/"+ingredients[4];
    slot5.appendChild(img5);
    
    var resouceDP5 = document.createElement('div');
    resouceDP5.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP5.appendChild(t1);
    slot5.appendChild(resouceDP5);

var slot6 = document.createElement('div');
    slot6.classList.add("reSlot");
    slot6.value = ingredients[5];
    
    var img6 = document.createElement('img');
    img6.classList.add("img1");
    img6.src = "../assets/sprites/"+ingredients[5];
    slot6.appendChild(img6);
    
    var resouceDP6 = document.createElement('div');
    resouceDP6.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP6.appendChild(t1);
    slot6.appendChild(resouceDP6);

var slot7 = document.createElement('div');
    slot7.classList.add("reSlot");
    slot7.value = ingredients[6];
    
    var img7 = document.createElement('img');
    img7.classList.add("glassImg");
    img7.src = "../assets/sprites/"+ingredients[6];
    slot7.appendChild(img7);
    
    var resouceDP7 = document.createElement('div');
    resouceDP7.classList.add("resouceDP");
    var t1 = document.createTextNode("0");
    resouceDP7.appendChild(t1);
    slot7.appendChild(resouceDP7);
    
    resourceTitle.appendChild(slot1);
    resourceTitle.appendChild(slot2);
    resourceTitle.appendChild(slot3);
    resourceTitle2.appendChild(slot4);
    resourceTitle2.appendChild(slot5);
    resourceTitle2.appendChild(slot6);
    resourceTitle2.appendChild(slot7);

document.getElementById('game').appendChild(resourceOverlay);

document.getElementById('game').appendChild(ui);