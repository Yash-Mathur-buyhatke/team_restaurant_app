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
        maxAge: 3000000000000000000000,
      },
      store: new MySQLStore({ logFn: function () {} }),
      saveUninitialized: false,
    })
  );

app.set('view engine',"ejs")

const port = process.env.PORT || 3000

const addPerson = async (req,res,email,password,type) => {
    var epass = await encryptPassword(req,res,password)
    var sql;
    console.log(email,'gher')
    if(type==1){
      sql = `INSERT INTO user (username,password,isadmin) VALUES('${email}','${epass}',1);`
    }
    else{
      sql = `INSERT INTO user (username,password,isadmin) VALUES('${email}','${epass}',0);`
    }
    await dbConnection.query(sql, async (error, result) => {
        console.log('Hi');
        console.log(result);
        console.log(error);
    })

}
const encryptPassword = async (req, res, password) => {
      const hashedPassword = await bcrypt.hash(`${password}`, 10);
      return hashedPassword;
    
  };
  
const decryptPassword = async (req, res, password, hashedPassword) => {
  try {
    const encodedPassword = await bcrypt.compare(password, hashedPassword);
    return encodedPassword;
  } catch (err) {
    res.status(501).json({ msg: `${err}` });
  }
};
  
const validEmail = (email) => {
  return validator.validate(email);
};

// routes 
app.get('',async (req,res,next) => {
    res.render('index')
})
app.get('/register',(req,res,next) => {
    res.render('register')
})
app.post('/register',async (req,res,next) => {
  var { email, password, isAdmin } = req.body;
  if(isAdmin.length==1) {
    try{
      addPerson(req,res,email,password,0);
      res.send({
        error:``,
        msg:"you have been added as an user"
      })
    }
    catch(err){
      res.send({
        error:`${err}`,
        msg:"failed"
      })
     
    }
    
  }
  else{
    try{
      addPerson(req,res,email,password,1);
      res.send({
        error:``,
        msg:"you have been added as a admin"
      })
    }
    catch(err){
      res.send({
        error:`${err}`,
        msg:"failed"
      })
    }
  }
  
})
app.post('/',async (req,res,next) => {            // login
    var { email, password } = req.body;
  try {
    if (req.session.authenticated) {
      res.render('purchaseItems')
    }
    else{
        let sql = `Select * from user where username="${email}"`;
    await dbConnection.query(sql, async (error, result) => {
      let obj = Object.assign({}, result);

      if (Object.keys(obj).length === 1) {
        let flag = await decryptPassword(req, res, `${password}`, obj[0].password);
        if (!flag){
            res.send({error:"sorry try again"})
        }
        else{
        req.session.authenticated = true;
        req.session.email = email;
        
        res.status(200).render('purchaseItems')
        }
        
      } else {
        res.status(400).json({ msg: "invalid user" });
      }});
    }
    
  } catch (err) {
    res.status(500).json({ msg: `${err}` });
  }
  
})
var server = app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
