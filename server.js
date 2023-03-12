require('dotenv').config({path: "./.env"})

const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.SERVER_PORT || 3000

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/create-checkout-session", async (req, res) => {
    let cart = req.body.shopCart
    console.log(cart)
    cart = cart.map((item) => {
      return {
        price: item.product.data.default_price,
        quantity: item.quantity,
      }
    })
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: cart,
    success_url: `${req.body.url}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.body.url}/declined`,
  });
  return res.send({ url: session.url });
})

app.listen(port, () => console.log(`Listening on port ${port}`))
