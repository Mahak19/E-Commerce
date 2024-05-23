import axios from "axios";
import { STRIPE_API_KEY } from "../features/stripeApiKey/stripeApiKeySlice";

// Function to fetch the Stripe API key
const getStripeApiKey = () => async (dispatch) => {
  try {
    // Sending a GET request to fetch the Stripe API key
    const { data } = await axios.get("/api/api/v1/stripeapikey");

    // Dispatching an action to store the fetched Stripe API key
    dispatch(STRIPE_API_KEY(data.key));
  } catch (error) {
    // Logging a message if the user is not logged in or there's an error fetching the API key
    console.log("Not Logged In or Error fetching the Stripe API Key");
  }
};

// Exporting the getStripeApiKey function for use in other modules
export { getStripeApiKey };
