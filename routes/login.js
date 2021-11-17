
const router = require('express').Router();

let loginController = require("../controllers/loginController")

router.get('',loginController.loginPage);
router.post('',loginController.loginUserWithEmailAndPassword);


module.exports = router