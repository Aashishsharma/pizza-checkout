const PIZZACONSTANTS = require('./constants/constants');
const PizzaFactory = require('./models/Pizza');
const CustomerPricingFactory = require('./models/CustomerPricing');
const PizzaCheckout = require('./PizzaCheckout');

const pizzaFactory = new PizzaFactory();
const customerPricingFactory = new CustomerPricingFactory();

let co = new PizzaCheckout(customerPricingFactory.create('DEFAULT'));
co.addItem(pizzaFactory.create("LARGE"), 1);
co.addItem(pizzaFactory.create("MEDIUM"), 1);
co.addItem(pizzaFactory.create("SMALL"), 1);
console.log(co.getTotalBill());

co = new PizzaCheckout(customerPricingFactory.create('INFOSYS'));
co.addItem(pizzaFactory.create("LARGE"), 1);
co.addItem(pizzaFactory.create("SMALL"), 3);
console.log(co.getTotalBill());

co = new PizzaCheckout(customerPricingFactory.create('AMAZON'));
co.addItem(pizzaFactory.create("LARGE"), 1);
co.addItem(pizzaFactory.create("MEDIUM"), 3);
console.log(co.getTotalBill());
