const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateProducts = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) throw error;
  next();
};

module.exports = validateProducts;
