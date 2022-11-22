require('dotenv').config({path: "./.env"})

const express = require('express')
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors({
  origin: "http://localhost:8080"
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const USER_SHOPPING_CART = [
  {
    id: "prod_MqZ1SmAp1VN8aC",
    default_price: "price_1M6rtgAnsxsStcQP8rwkbIEI",
    quantity: 1,
  },
  {
    id: "prod_MqZ7WfUEU6YX8j",
    default_price: "price_1M6rziAnsxsStcQPwISlocfS",
    quantity: 1,
  },
  {
    id: "prod_MqZ9e6zxgCS0cs",
    default_price: "price_1M6s13AnsxsStcQPrcSwUuwU",
    quantity: 1,
  }
]

// Get backend to load here
app.post("/create-checkout-session", async (req, res) => {
  const lineItems = USER_SHOPPING_CART.map((item) => {
    return {
      price: item.default_price,
      quantity: item.quantity,
    };
  });
  console.log("Working")
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:8080/declined`,
  });
  return res.send({ url: session.url });
})

app.listen(3000)