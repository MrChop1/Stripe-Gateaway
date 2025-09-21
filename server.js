// server.js
const express = require("express");
const app = express();
const stripe = require("stripe")("pk_test_Replace_it"); // Replace with your secret key
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-Shirt",
            },
            unit_amount: 2000, // $20.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
    });

    res.json({ id: session.id });
  } catch (err) {
     console.error("Stripe Error:", err); // Add this line
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log("Server running on http://localhost:4242"));
