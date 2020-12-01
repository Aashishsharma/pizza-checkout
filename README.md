## Pizza Checkout
This library calculates the Pizaa bills for various customer's including the flexible discount strategy

#### Dependencies
Node.js > 12.0.0 

#### Config
This library aims at keeping Pizza pricing rules as flexible as possible.  
Pricing rules for different customer companies is listed [here](src/config/pricingRules.js)  
**How to read the config?**  
The config file contains an object with  
1. key - customer company name
2. value - is Array of Arrays -  
Each inner array in an array is one pricing rule  
Inner array has a length of 2 or 3  
If the lenght is 3, e.g. **CustomerCompany: [['SMALLPIZZA', 3,2]]**  
it means an offer of buy 2 get 3 is applied on small pizza  CustomerCompany  
If the lenght is 2, e.g.  **CustomerCompany: [['SMALLPIZZA', 30]]**  
it means an offer of $30 off is applied on small pizza for CustomerCompany  
Happy configuring :smiley: :blue_heart:  

#### Install
npm install

#### Run
npm run start

#### Test
npm run test
