const PizzaCheckout = require('../src/PizzaCheckout');
const PizzaFactory = require('../src/models/Pizza');
const CustomerPricingFactory = require('../src/models/CustomerPricing');

describe('Default customers - no pricing rule', () => {
  let pizzaFactory;
  let customerPricingFactory;
  let pco;

  beforeEach(() => {
  	pizzaFactory = new PizzaFactory();
	customerPricingFactory = new CustomerPricingFactory();
    pco = new PizzaCheckout(customerPricingFactory.create('DEFAULT'));
  });

  test('1 small + 1 large pizaa, no discount', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("SMALL"), 1);
	expect(pco.getTotalBill()).toBe(664.98);
  });

  test('All types of pizza bough once returns total', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("MEDIUM"), 1);
	pco.addItem(pizzaFactory.create("SMALL"), 1);
	expect(pco.getTotalBill()).toBe(987.97);
  });
});

describe('Infosys customers - 3 on 2 offer', () => {
  let pizzaFactory;
  let customerPricingFactory;
  let pco;

  beforeEach(() => {
  	pizzaFactory = new PizzaFactory();
	customerPricingFactory = new CustomerPricingFactory();
    pco = new PizzaCheckout(customerPricingFactory.create('INFOSYS'));
  });

  test('1 small + 1 large pizaa, no discount', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("SMALL"), 1);
	expect(pco.getTotalBill()).toBe(664.98);
  });

  test('3 small + 1 large, discount applied', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("SMALL"), 3);
	expect(pco.getTotalBill()).toBe(934.97);
  });
});

describe('Amazon customers - $95 discount', () => {
  let pizzaFactory;
  let customerPricingFactory;
  let pco;

  beforeEach(() => {
  	pizzaFactory = new PizzaFactory();
	customerPricingFactory = new CustomerPricingFactory();
    pco = new PizzaCheckout(customerPricingFactory.create('AMAZON'));
  });

  test('1 small + 1 large pizaa, discount applied', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("SMALL"), 1);
	expect(pco.getTotalBill()).toBe(569.98);
  });

  test('3 medium + 1 large, discount applied', () => {
    pco.addItem(pizzaFactory.create("LARGE"), 1);
	pco.addItem(pizzaFactory.create("MEDIUM"), 3);
	expect(pco.getTotalBill()).toBe(1268.96);
  });
});