/**
* Get actual Pizza's to be billed
* @param {number} pizzaCount - Pizza count
* @param {Array} pizzaDeal   - Array of 2 numbers depicting the offer [3, 2] -> buy 2 get 3 Pizza's
* @return {number}           - No. of pizza's to be billed
*/
exports.getDiscountedPizza = (pizzaCount, pizzaDeal) => {
  let discountedPizzaCnt = Math.floor(pizzaCount / pizzaDeal[0]);
  let noDiscountPizzaCnt = pizzaCount % pizzaDeal[0];
  
  return (pizzaDeal[1] * discountedPizzaCnt) + noDiscountPizzaCnt;
}

/**
* Check if the rule is valid
* @param {object} pricingRules - Pricing rules array
* @return {boolean}            - is the pricing rule valid?
*/
exports.isValidPricingRule = (pricingRules) => {
  let isValid = false;
  
  pricingRules.forEach((pricingRule) => {	
  	const pricingRuleLength = pricingRule.length;

    // For default cutomers - no pricing rule, return true
  	if (pricingRuleLength == 0) {
  	  isValid = true;
  	} else {
      // check if pricing rule is an array and discount is of type 3 on 2
      if (Array.isArray(pricingRule) && pricingRuleLength == 3) {
        if ((pricingRule[1] > pricingRule[2]) && (pricingRule[1] > 0 && pricingRule[2] > 0)) {
          isValid = true;
        } else {
          isValid = false;
        } 
      } else {
        // check if discount is of type - $5 off on a particular pizza size
        if(Array.isArray(pricingRule) && pricingRuleLength == 2 && pricingRule[1] > 0) 
          isValid = true;
        else
        isValid = false;
      }
    }
  });

  return isValid;  
}

