//Done
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
let registerController = require("../controllers/registerController")

router.get('',registerController.registerPage);
router.post('/addnewuser',[body('userName').isEmail(),body('password').isLength({ min: 5 })],registerController.registerNewUser);


module.exports = router
