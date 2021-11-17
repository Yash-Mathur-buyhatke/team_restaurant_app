
const router = require("express").Router();
const register = require("./register")
const login = require("./login")
const items = require("./items")
// _apis
const itemsApi = require("../api/items")
router.use("/login", login)
router.use("/register", register)
router.use("/items",itemsApi)           
router.use("/user",items)



module.exports = router