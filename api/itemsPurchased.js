
const router = require('express').Router();
let itemsPurchasedController = require("../controllers/itemsPurchasedController")

router.get('',itemsPurchasedController.itemsPurchased);

module.exports = router