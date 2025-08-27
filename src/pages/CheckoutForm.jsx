import {
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const axios = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const res = await axios.post("/create-payment-intent",{amount} ,{
      headers: {
        "Content-Type": "application/json"
      }
    });

    const { clientSecret } = await res.data;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        onSuccess(); // Show form after success
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={processing}>
        {processing ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
