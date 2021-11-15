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
app.get('/logout',(req,res,next)=>{
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

//login
app.get('',async (req,res,next) => {
    res.render('index')
    
})
app.get('/register',(req,res,next) => {
    res.render('register')
})
app.get('/fetchuserpastorders',(req,res,next)=>{
  const sql = `SELECT * FROM orders where status='done' and email='${req.session.email}'`;
  
  dbConnection.query(sql, async (error, result) => {
    
    res.send(result);
    console.log(error);
})
})
app.get('/pastorders',(req,res,next) => {
  res.render('pastOrders')
})

app.post('/register',[body('email').isEmail(),body('password').isLength({ min: 5 })],async (req,res,next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
  var { email, password, isAdmin } = req.body;
  
  try{
    addPerson(req,res,email,password,0);
    return res.send({
      error:``,
      msg:"you have been added as an user"
    })
  }
  catch(err){
    return res.send({
      error:`${err}`,
      msg:"failed"
    })
   
  }
  
})
app.get('/fetchdata',(req,res,next)=>{    // api for available items
  const sql = "SELECT * FROM ITEMS;"
  
  dbConnection.query(sql, async (error, result) => {
    
    res.send(result);
    console.log(error);
})
})
app.get('/purchaseitems',(req,res,next)=>{ // api for displaying available items for purchase
  res.render('purchaseitems')
})

// app.post('/purchaseitems' , (req,res) => {
//   // try{
//   //     if(typeof(req.session.authenticated) == 'undefined'){
//   //         return res.status(400).send('Please login first');
//   //     }
      
//       let address = req.body.address;
//       let email = req.session.username;

//       for(var data in req.body){
//         if(data!='address'){
//           console.log(data)
//           let sql = `INSERT INTO orders (address,item,email,qty,status) values("${address}","${data}","${email},"${req.body[data]}","pending")`;
//           dbConnection.query(sql, (error, result) => {
//             if (error) {
//               return res.status(501).json({ msg: `${error}` });
//             }
//             console.log(result)
//           });
//         }
//       }
//       res.send({ msg:"Successfully placed"})
//   //     
//   // }catch(e){
//   //     console.log(e);
//   //     return res.status(500).send('Internal Error');
//   // } 
// });

app.post('/purchaseitems' , (req,res) => {
  try{
      if(typeof(req.session.email) == 'undefined'){
        console.log(1);  
        return res.status(400).send('Please login first');
      }
      
      let address = req.body.address;
      for(const key in req.body){
          if(key=='address') continue;
          if(req.body[key] !== '0'){
            console.log(address,key,req.session.email,typeof req.body[key],'pending')
            // console.log(typeof(req.body[key]));
            let sql = `INSERT INTO orders(address,item,email,qty,status) values("${address}","${key}","${req.session.email}","${req.body[key]}", "pending")`;
            dbConnection.query(sql, (error, result) => {
                if (error) {
                  console.log('MAIN ' , sql);
                   
                  return res.status(501).json({ msg: `${error}` });
                }
                // console.log(result)
            });
          }
      }   
      console.log(3);
      return res.status(200).send('Your order have been recieved , waiting for confirmation');
  }catch(e){
      console.log(e);
      console.log(4);
      return res.status(500).send('Internal Error');
  } 
});
// app.post("/purchaseitems", (req, res) => {
//   console.log(req.body)
//   if (req.session.authenticated) {
//     try {
//       var { address } = req.body.address;
//       if (address === null || address === "")
//         return res.status(401).json({ msg: "enter address cannot be empty" });

//         for (var key in req.body) {
//         {
//           if(req.body[key] == 0) continue;
//           let sql = `INSERT INTO orders (address,item,email,qty,status) values("${address}","${key}","${req.session.username},"${req.body[key]}","pending")`;
//           dbConnection.query(sql, (error, result) => {
//             if (error) {
//               return res.status(501).json({ msg: `${error}` });
//             }
//             console.log('DONE',result)
//           });
//         }
        
//         return res.status(200).json({ msg: "waiting for confirmation" });
//       }
//     } catch (err) {
//       // return res.status(501).json({ msg: `${err}` });
//     }
//   } else {
//     return res.status(401).json({ msg: "first log in" });
//   }
// });

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
