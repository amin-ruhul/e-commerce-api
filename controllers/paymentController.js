const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const makePayment = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",

      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

const sendStripeApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      stripeApiKay: process.env.STRIPE_API_KEY,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  makePayment,
  sendStripeApiKey,
};
