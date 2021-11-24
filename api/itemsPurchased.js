
const router = require('express').Router();
let itemsPurchasedController = require("../controllers/itemsPurchasedController")

router.get('',itemsPurchasedController.itemsDelivered);

module.exports = router