// This is a namespace. If this object
// is not present, it is initialized
// by an empty object
var OregonH = OregonH || {};

OregonH.Caravan = {};

OregonH.Caravan.init = function(stats) {
  this.day = stats.day;
  this.distance = stats.distance;
  this.crew = stats.crew;
  this.food = stats.food;
  this.oxen = stats.oxen;
  this.money = stats.money;
  this.firepower = stats.firepower;
};

// Update weight and capacity
OregonH.Caravan.updateWeight = function() {
  var droppedFood = 0;
  var droppedGuns = 0;

  // How much can the caravan carry?
  this.capacity = this.oxen * OregonH.WEIGHT_PER_OX + this.crew * OregonH.WEIGHT_PER_PERSON;

  // How much is the current weight?
  this.weight = this.food * OregonH.FOOD_WEIGHT + this.firepower * OregonH.FIREPOWER_WEIGHT;

  // Drop items if there is too much weight
  // Assume guns are dropped before food

  while(this.firepower && this.capacity <= this.weight) {
    this.firepower--;
    this.weight -= OregonH.FIREPOWER_WEIGHT;
    droppedGuns++;
  }

  if (droppedGuns) {
    this.ui.notify('Left ' +droppedGuns+' guns behind', 'negative');
  };

  while(this.food && this.capacity <= this.weight) {
    this.food--;
    this.weight -= OregonH.FOOD_WEIGHT;
    droppedFood++;
  }

  if (droppedFood) {
    this.ui.notify('Left '+droppedFood+' food provisions behind', 'negative');
  };
};

// Update covered distance
OregonH.Caravan updateDistance = function() {
  // The closer to full capacity, the slower
  var diff = this.capacity - this.weight;
  var speed = OregonH.SLOW_SPEED + diff/this.capacity * OregonH.FULL_SPEED;
  this.distance += speed;
};

// Food consumption
OregonH.Caravan.consumeFood = function() {
  this.food -= this.crew * OregonH.FOOD_PER_PERSON;
  if (this.food < 0) {
    this.food = 0;
  };
};