const Joi = require('joi');

const productSaleSchema = Joi.object({
  productId: Joi.number().min(0).required(),
  quantity: Joi.number().min(1).required(),
});

const validateSale = (req, res, next) => {
  const [teste] = req.body;
  const { error } = productSaleSchema.validate(teste);

  if (error) {
    throw error;
  }
  next();
};

module.exports = validateSale;