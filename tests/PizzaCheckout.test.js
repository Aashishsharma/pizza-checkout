const PizzaCheckout = require('../src/PizzaCheckout');
const PizzaFactory = require('../src/models/Pizza');
const CustomerPricingFactory = require('../src/models/CustomerPricing');

let pizzaFactory;
let customerPricingFactory;
let pco;

beforeAll(() => {
	// Inititalize pricing rules for customers
	return dummyPricingRules = {
    "INFOSYS": [["SMALL", 3,2]],
    "AMAZON": [["LARGE", 95]],
    "FACEBOOK": [["MEDIUM", 5, 4], ["LARGE", 5], ["SMALL", 100]],
    "DEFAULT": [[]]
  };
})

describe('Default customers - no pricing rule', () => {
  
  beforeEach(() => {
  	pizzaFactory = new PizzaFactory();
	customerPricingFactory = new CustomerPricingFactory();
    pco = new PizzaCheckout(customerPricingFactory.create('DEFAULT', dummyPricingRules['DEFAULT']));
  });

  test('1 small + 1 large pizaa, no discount', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("SMALL"), 1);

	expect(pco.pizzaItem.size).toEqual(2);
	expect(pco.pricingRules.ruleMap.has("LARGE")).toBe(false);
	expect(pco.pricingRules.ruleMap.has("SMALL")).toBe(false);
	expect(pco.pricingRules.ruleMap.has("MEDIUM")).toBe(false);
	expect(pco.getTotalBill()).toEqual(664.98);
  });

  test('All types of pizza bough once returns total', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("MEDIUM"), 1);
	pco.addItem(pizzaFactory.create("SMALL"), 1);
	
	expect(pco.pizzaItem.size).toEqual(3);
	expect(pco.pricingRules.ruleMap.has("LARGE")).toBe(false);
	expect(pco.pricingRules.ruleMap.has("SMALL")).toBe(false);
	expect(pco.pricingRules.ruleMap.has("MEDIUM")).toBe(false);
	expect(pco.getTotalBill()).toEqual(987.97);
  });
});

describe('Facebook customers - $5 discount on large pizaa + 5 on 4 offer on medium Pizza and $100 off on small pizza', () => {

  beforeEach(() => {
  	pizzaFactory = new PizzaFactory();
	customerPricingFactory = new CustomerPricingFactory();
    pco = new PizzaCheckout(customerPricingFactory.create('FACEBOOK', dummyPricingRules['FACEBOOK']));
  });

  test('4 Small + 27 Medium + 6 large pizaa, discount applied', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 6);
	pco.addItem(pizzaFactory.create("MEDIUM"), 27);
	pco.addItem(pizzaFactory.create("SMALL"), 4)

	expect(pco.pizzaItem.size).toEqual(3);
	expect(pco.pricingRules.ruleMap.has("LARGE")).toBe(true);
	expect(pco.pricingRules.ruleMap.has("SMALL")).toBe(true);
	expect(pco.pricingRules.ruleMap.has("MEDIUM")).toBe(true);
	expect(pco.getTotalBill()).toEqual(10125.68);
  });

});

describe('Infosys customers - 3 on 2 offer', () => {

  beforeEach(() => {
  	pizzaFactory = new PizzaFactory();
	customerPricingFactory = new CustomerPricingFactory();
    pco = new PizzaCheckout(customerPricingFactory.create('INFOSYS', dummyPricingRules['INFOSYS']));
  });

  test('1 small + 1 large pizaa, no discount', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("SMALL"), 1);
	
	expect(pco.pizzaItem.size).toEqual(2);
	expect(pco.pricingRules.ruleMap.has("SMALL")).toBe(true);
	expect(pco.pricingRules.ruleMap.has("MEDIUM")).toBe(false);
	expect(pco.pricingRules.ruleMap.has("LARGE")).toBe(false);
	expect(pco.getTotalBill()).toEqual(664.98);
  });

  test('3 small + 1 large, discount applied', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("SMALL"), 3);
	
	expect(pco.pizzaItem.size).toEqual(2);
	expect(pco.pricingRules.ruleMap.has("LARGE")).toBe(false);
	expect(pco.pricingRules.ruleMap.has("SMALL")).toBe(true);
	expect(pco.pricingRules.ruleMap.has("MEDIUM")).toBe(false);
	expect(pco.getTotalBill()).toEqual(934.97);
  });
});

describe('Amazon customers - $95 discount', () => {

  beforeEach(() => {
  	pizzaFactory = new PizzaFactory();
	customerPricingFactory = new CustomerPricingFactory();
    pco = new PizzaCheckout(customerPricingFactory.create('AMAZON', dummyPricingRules['AMAZON']));
  });

  test('1 small + 1 large pizaa, discount applied', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("SMALL"), 1);
	
	expect(pco.pizzaItem.size).toEqual(2);
	expect(pco.pricingRules.ruleMap.has("LARGE")).toBe(true);
	expect(pco.pricingRules.ruleMap.has("SMALL")).toBe(false);
	expect(pco.pricingRules.ruleMap.has("MEDIUM")).toBe(false);
	expect(pco.getTotalBill()).toEqual(569.98);
  });

  test('3 medium + 1 large, discount applied', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("MEDIUM"), 3);
	
	expect(pco.pricingRules.ruleMap.has("LARGE")).toBe(true);
	expect(pco.pricingRules.ruleMap.has("SMALL")).toBe(false);
	expect(pco.pricingRules.ruleMap.has("MEDIUM")).toBe(false);
	expect(pco.pizzaItem.size).toEqual(2);
	expect(pco.getTotalBill()).toEqual(1268.96);
  });
});
