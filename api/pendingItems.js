const router = require('express').Router();
let itemsPendingController = require("../controllers/itemsPendingController")

router.get('',itemsPendingController.itemsPending);

module.exports = router