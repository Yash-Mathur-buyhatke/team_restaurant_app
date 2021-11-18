const router = require('express').Router();
let deliveredItemsController = require("../controllers/deliveredItemsController")

router.post('',deliveredItemsController.itemsToBeDelivered);

module.exports = router