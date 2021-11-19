const router = require("express").Router();

const itemsForSell = require("./itemsForSell")
const itemsPurchased = require("./itemsPurchased")
const pendingItems = require("./pendingItems")
const deliveredItems = require("./deliveredItems")
const payment = require("./payment")
router.use("/sell",itemsForSell)
router.use("/history",itemsPurchased)
router.use("/pending",pendingItems)
router.use("/delivered",deliveredItems)
router.use("/payment",payment)
module.exports = router