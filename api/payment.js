const router = require('express').Router();
let itemsPurchasedController = require("../controllers/itemsPurchasedController")

router.post('',itemsPurchasedController.paymentCall);
module.exports = router