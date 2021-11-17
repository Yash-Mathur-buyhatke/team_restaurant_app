const express = require('express')
const dbConnection = require('./databaseConnection')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator');      
const path = require('path')
const session = require('express-session');
var MySQLStore = require('session-file-store')(session);
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const publicDirectoryPath = path.join(__dirname,'/public')
app.use(express.static(publicDirectoryPath)) 

app.use(
    session({
      resave: false,
      secret: "123123",
      cookie: {
        maxAge : 600000000000,
      },
      store: new MySQLStore({ logFn: function () {} }),
      saveUninitialized: false,
    })
  );

app.set('view engine',"ejs")

const port = process.env.PORT || 3000

// routes 
app.get('/app/logout',(req,res,next)=>{
  try{
    if(req.session.authenticated){
      req.session.destroy();
      res.clearCookie() 
        res.send({
          msg:"succesfully logged out"
        })
    }else{
      return res.send("login first")
    } 
  }
  catch (err) {
    res.send({ msg: 'Something went wrong'})
  }
})
app.use("/app", require("./routes"));

app.get('/',(req,res)=>{
  res.redirect('/app/login')
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
