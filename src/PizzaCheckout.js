class PizzaCheckout {
  /**
  * Represents a PizzaCheckout
  * @constructor
  * @param {CustomerPricingFactory} pricingRules - Pricing Rule applied for specific customer
  */
  constructor(pricingRules) {
    this.pizzaItem = new Map();
    this.pricingRules = pricingRules;
    this.totalBill = 0;
  }

  /**
  * Add more Pizza's in the checkout
  * @param {Pizza} item   - Pizza item
  * @param {number} count - Pizza count
  */
  addItem = (item, count) => {
    this.pizzaItem.set(item, count);
  }

  // Calculate the bill for a particular customer checkout
  // this function reads the pricing rules for a specific customer
  // and accordingly applies the discount
  getTotalBill = () => {
    this.pizzaItem.forEach((pizzaCount, pizza) => {
      // check if eligible for discount
      if (this.pricingRules.ruleMap.has(pizza.type)) {
        // discount is of type -> buy 2 get 3
        if (this.pricingRules.ruleMap.get(pizza.type).length == 2) {
          const noOfPizzasToBeBilled = getDiscountedPizza(pizzaCount, this.pricingRules.ruleMap.get(pizza.type));
          this.totalBill += noOfPizzasToBeBilled * pizza.price;
        }
        // discount is of type -> $50 off
        else {
          this.totalBill += pizzaCount * (pizza.price - this.pricingRules.ruleMap.get(pizza.type)[0]);
        }
      }
      // no discount available 
      else {
        this.totalBill += pizzaCount * pizza.price;
      }
    })
    return this.totalBill;
  }
}

/**
* Get actual Pizza's to be billed
* @param {number} pizzaCount - Pizza count
* @param {Array} pizzaDeal   - Array of 2 numbers depicting the offer [3, 2] -> buy 2 get 3 Pizza's
*/
getDiscountedPizza = (pizzaCount, pizzaDeal) => {
  let discountedPizzaCnt = Math.floor(pizzaCount / pizzaDeal[0]);
  let noDiscountPizzaCnt = pizzaCount % pizzaDeal[0];
  return (pizzaDeal[1] * discountedPizzaCnt) + noDiscountPizzaCnt;
 }

module.exports = PizzaCheckout;