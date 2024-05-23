const sendStripeApiKey = async (req, res) => {
  try {
    // Retrieve the Stripe API key from environment variables
    const key = process.env.STRIPE_API_KEY;
    // Send a successful response with the Stripe API key
    res.status(200).json({
      success: true,
      key,
    });
  } catch (error) {
    // If an error occurs, send a server error response with the error message
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default sendStripeApiKey;
