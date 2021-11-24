const router = require('express').Router();
let insertNewItemsController = require("../controllers/insertNewItemsController")

router.post('',insertNewItemsController.insertNewItem);

module.exports = router