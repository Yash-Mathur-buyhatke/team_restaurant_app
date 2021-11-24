const router = require('express').Router();
let itemsController = require("../controllers/items")
router.get('/purchaseitems',itemsController.purchaseItemsPage);
// router.post('/purchaseitems',itemsController.purchaseItemsForUser)
router.get('/history',itemsController.historyPage)
router.get('/orderplaced',itemsController.orderPlacedPage)
module.exports = router
