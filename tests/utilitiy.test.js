const utility = require('../src/utils/utility');

describe('Check pricing rule is valid', () => {
  
  beforeAll(() => {
  	// Inititalize dummy pricing rules for customers
    return dummyPricingRules = {
      "INFOSYS": [["SMALL", 3, 2]],
      "AMAZON": [["LARGE", -95]],
      "FACEBOOK": [["MEDIUM", 5, 4], ["LARGE", 5], ["SMALL", 100, 99]],
      "DEFAULT": [[]],
      "INVALIDCUSTOMER": [[["SMALL", 1, 2]]]
    };
  });

  test('when rule is valid', () => {
  	expect(utility.isValidPricingRule(dummyPricingRules["FACEBOOK"])).toBe(true);
  	expect(utility.isValidPricingRule(dummyPricingRules["INFOSYS"])).toBe(true);
  });

  test('when rule is valid -> Default customers, no rule', () => {
  	expect(utility.isValidPricingRule(dummyPricingRules["DEFAULT"])).toBe(true);
  });

  test('when rule is invalid -> discount is negative', () => {
  	expect(utility.isValidPricingRule(dummyPricingRules["AMAZON"])).toBe(false);
  });

  test('when rule is invalid -> offer is buy 2 get 1', () => {
  	expect(utility.isValidPricingRule(dummyPricingRules["INVALIDCUSTOMER"])).toBe(false);
  });
});

describe('Check getDiscounted pizza', () => {
  
  test('for buy 1 get 2 type of offer', () => {
  	expect(utility.getDiscountedPizza(30, [3, 2])).toEqual(20);
  	expect(utility.getDiscountedPizza(30, [11, 9])).toEqual(26);
  	expect(utility.getDiscountedPizza(3, [3, 2])).toEqual(2);

  });
});