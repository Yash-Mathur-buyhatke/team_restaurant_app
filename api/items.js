const router = require("express").Router();

const itemsForSell = require("./itemsForSell")
const itemsPurchased = require("./itemsPurchased")
router.use("/sell",itemsForSell)
router.use("/history",itemsPurchased)

module.exports = router