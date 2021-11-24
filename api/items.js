const router = require("express").Router();

const itemsForSell = require("./itemsForSell")
const itemsPurchased = require("./itemsPurchased")
const pendingItems = require("./pendingItems")
const changeItemStatus = require("./changeItemStatus")
const payment = require("./payment")
const insertNewItems = require("./insertNewItems")
const canceledItems =require("./canceledItems")
router.use("/sell",itemsForSell)
router.use("/delivered",itemsPurchased)
router.use("/pending",pendingItems)
router.use("/changestatus",changeItemStatus)
router.use("/pending",pendingItems)
router.use("/canceled",canceledItems)
router.use("/payment",payment)
router.use("/insert",insertNewItems)
module.exports = router