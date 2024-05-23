import { Stripe } from "stripe";

// Initialize Stripe with the secret key from environment variables
var stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
  try {
    // Create a payment intent with the provided amount and currency
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });
    // Send a successful response with client secret for the payment intent
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    // If an error occurs, send a server error response with the error message
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default processPayment;
