const express = require('express')
const databaseConnection = require('./databaseConnection')
const { body, validationResult } = require('express-validator');
const path = require('path')
const session = require('express-session');
var MySQLStore = require('session-file-store')(session);
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const publicDirectoryPath = path.join(__dirname,'/public')
app.use(express.static(publicDirectoryPath)) 

app.set('view engine',"ejs")
const port = process.env.PORT || 3000

// routes 
app.get('',(req,res,next) => {
    res.render('index')
})
app.get('/register',(req,res,next) => {
    res.render('register')
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})