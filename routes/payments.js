const router = require('express').Router();
let itemPurchasedController = require("../controllers/itemsPurchasedController")
router.post('/configure',itemPurchasedController.paymentConfigure);
module.exports = router