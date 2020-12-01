const PizzaFactory = require('./models/pizza');
const CustomerPricingFactory = require('./models/customer-pricing');
const PizzaCheckout = require('./pizza-checkout');
const pricingRules = require('./config/pricing-rules');

const pizzaFactory = new PizzaFactory();
const customerPricingFactory = new CustomerPricingFactory();

try {
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

} catch(err) {
  console.error('There was an error', err);
  process.exit(1);
}
