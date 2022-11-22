require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([

])
// Get backend to load here
app.post("create-checkout-session", async (req, res) => {
  res.json({url: "Hi"})
})

app.listen(3000)