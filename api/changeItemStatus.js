const router = require('express').Router();
let changeItemStatusController = require("../controllers/changeItemStatusController")

router.post('',changeItemStatusController.changeItemStatus);

module.exports = router