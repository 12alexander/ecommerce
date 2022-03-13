import express from "express"
import mongoose from "mongoose"
import Product from "./models/product.js"
import Order from "./models/order.js"
import mercadopago from "mercadopago"
const router = express.Router()

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (e) {
    next(e)
  }
})

router.post("/products", async (req, res, next) => {
  try {
    const { name, description, price, image } = req.body
    const product = await Product.create({ name, description, price, image })
    res.json(product)
  } catch (e) {
    next(e)
  }
})

router.post("/payment", (req, res) => {
  console.log("hola que hace llego al back")
  console.log(req.body)
  mercadopago.configurations.setAccessToken("TEST-488931646274218-030417-4d6837e10ae138c03e89483d2f77316d-1084043146")

  mercadopago.payment
    .save(req.body)
    .then((response) => {
      return res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id,
      })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).send(err)
    })
})

/*
router.post("/pay", (req, res) => {
  mercadopago.configurations.setAccessToken("TEST-488931646274218-030417-4d6837e10ae138c03e89483d2f77316d-1084043146")
  const payment_data = {
    transaction_amount: 58.8,
    token: "TEST-8051734209416360-030417-537e5015bcd4e2990c8ac8ed5852b222-1084159167",
    description: "Payment for product",
    installments: 1,
    payment_method_id: "visa",
    issuer_id: 8987269652,
    payer: {
      email: "test_user_80507629@testuser.com",
      identification: {
        type: "DNI",
        number: "12345678",
      },
    },
  }

  mercadopago.payment
    .create(payment_data)
    .then((response) => {
      console.log(response)
      return res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id,
      })
    })
    .catch((err) => {
      return res.status(500).send(err)
    })
})*/
/*
router.post("/orders", async (req, res) => {
  //const { products } = req.body
  //console.log("llego")
  //var mercadopago = require("mercadopago")
  mercadopago.configure({
    access_token: "TEST-488931646274218-030417-4d6837e10ae138c03e89483d2f77316d-1084043146",
  })

  var preference = {
    items: [
      {
        title: "pc",
        quantity: 1,
        currency_id: "ARS",
        unit_price: 1.5,
      },
    ],
  }

  mercadopago.preferences
    .create(preference)
    .then((data) => res.json(data))
    .catch((e) => console.log(e))
})*/

router.post("/orders", async (req, res) => {
  const { products } = req.body
  console.log(products)
  for (let i = 0; i < req.body.length; i++) {
    const product = await Product.findById(new mongoose.Types.ObjectId(products[i])).lean()
    products[i] = product
  }
  const order = await Order.create({ products })
  res.json(order)
})

export default router
