const utility = require('../utils/utility');

class CustomerPricing {
  /**
  * Represents a CustomerPricing
  * @constructor
  * @param {String} customerName - Name of the customer company
  */
  constructor(customerName) {
    this.customerName = customerName;
    this.ruleMap = new Map();
  }

  /**
  * Create rule for an individual customer company
  * @constructor
  * @param {Array} arrRules - List of pricing rule to be applied for specific customer
  */
  createRule(arrRules) {
    arrRules.forEach((rule) => {
      if (rule[2]) {
        this.ruleMap.set(rule[0], [rule[1], [rule[2]]]);
      } else {
        this.ruleMap.set(rule[0], [rule[1]]);
      }
    })
  }
}

function CustomerPricingFactory() {
  this.create = (customerName, pricingRules) => {
    const customerPricingRule = new CustomerPricing(customerName);
    if (!utility.isValidPricingRule(pricingRules)) {
      throw new Error('Pricing Rule syntax is incorrect');  
    } else {
      customerPricingRule.createRule(pricingRules);
      return customerPricingRule;      
    }
  }
}

module.exports = CustomerPricingFactory;