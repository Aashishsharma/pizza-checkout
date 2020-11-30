const PizzaFactory = require('./models/Pizza');
const CustomerPricingFactory = require('./models/CustomerPricing');
const PizzaCheckout = require('./PizzaCheckout');
const pricingRules = require('./config/pricingRules');

const pizzaFactory = new PizzaFactory();
const customerPricingFactory = new CustomerPricingFactory();

let pco = new PizzaCheckout(customerPricingFactory.create('DEFAULT', pricingRules['DEFAULT']));
pco.addItem(pizzaFactory.create("LARGE"), 1);
pco.addItem(pizzaFactory.create("MEDIUM"), 1);
pco.addItem(pizzaFactory.create("SMALL"), 1);
console.log(`Output: Total $${pco.getTotalBill()}`);

pco = new PizzaCheckout(customerPricingFactory.create('INFOSYS', pricingRules['INFOSYS']));
pco.addItem(pizzaFactory.create("LARGE"), 1);
pco.addItem(pizzaFactory.create("SMALL"), 3);
console.log(`Output: Total $${pco.getTotalBill()}`);

pco = new PizzaCheckout(customerPricingFactory.create('AMAZON', pricingRules['AMAZON']));
pco.addItem(pizzaFactory.create("LARGE"), 1);
pco.addItem(pizzaFactory.create("MEDIUM"), 3);
console.log(`Output: Total $${pco.getTotalBill()}`);
