const router = require('express').Router();
let itemsForSellController = require("../controllers/itemsForSellController")

router.get('',itemsForSellController.itemsForSell);

module.exports = router