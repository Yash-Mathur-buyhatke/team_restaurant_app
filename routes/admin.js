const router = require('express').Router();
let adminController = require("../controllers/adminController")
router.get('/orderconfirmation',adminController.orderConfirmationPage);

module.exports = router
