const PIZZACONSTANTS = require('../constants/constants')

const pricingRules = {
  "INFOSYS": [[PIZZACONSTANTS.SMALLPIZZA, 3,2]],
  "AMAZON": [[PIZZACONSTANTS.LARGEPIZZA, 95]],
  "FACEBOOK": [[PIZZACONSTANTS.MEDIUMPIZZA, 5, 4], [PIZZACONSTANTS.LARGEPIZZA, 5]],
  "DEFAULT": [[]]
};

module.exports = pricingRules;