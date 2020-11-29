const PIZZACONSTANTS = require('../constants/constants');

class Pizza {
  /**
  * Represents a Pizza.
  * @constructor
  * @param {string} type  - Type of Pizza.
  * @param {number} size  - Size of Pizza in inches.
  * @param {number} price - Price of Pizza in $.
  */
  constructor(type, size, price) {
    this.type = type;
    this.size = size;
    this.price = price;
  }

  // get Pizza description
  getDescription = () => {
    return `${this.type} ${this.size} inch Pizza only at $${this.price}`; 
  }
};

function PizzaFactory() {
  this.create = (type) => {
    switch(type) {
      case 'SMALL':
        return new Pizza(PIZZACONSTANTS.SMALLPIZZA, PIZZACONSTANTS.SMALLPIZZASIZE, PIZZACONSTANTS.SMALLPIZZAPRICE);
      case 'MEDIUM':
        return new Pizza(PIZZACONSTANTS.MEDIUMPIZZA, PIZZACONSTANTS.MEDIUMPIZZASIZE, PIZZACONSTANTS.MEDIUMPIZZAPRICE);
      case 'LARGE':
        return new Pizza(PIZZACONSTANTS.LARGEPIZZA, PIZZACONSTANTS.LARGEPIZZASIZE, PIZZACONSTANTS.LARGEPIZZAPRICE);
    }
  }
}

module.exports = PizzaFactory;
