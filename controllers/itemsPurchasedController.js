const responseGen = require('./responseGenerator')

// structuring done
const dbConnection = require('../databaseConnection')
const stripe = require('stripe')("sk_test_51JxOJ3SJcXKxPen0p4hFP9iZdQq8dpU1f4unqP0rU9r5hVjisKB3XfuNjuhK7vpO8wC1YZaX3qLC6bMMPygRX8gB00bjIugpZj")


const purchaseItemsForUser = (data,userName) => {
  var count = 0;
  

  for (let [item, value] of data) {

    var address = data.get("address");
    if (item != "address") {
      console.log(address,item,userName,data.get(item)[1],0)
      let sql = `INSERT INTO orders(address,item,username,quantity,status) values('${address}','${item}','${userName}','${data.get(item)[1]}',0)`;
      dbConnection.query(sql, (error, result) => {
        if (error) {
          console.log(error)
          return {
            
            success: 0,
            message: "Something might happend wrong with my sql query!",
            errors: [{ message: `${error}` }],
          };
        } else {
          
          count++;
        }
      });
    }
  }

  return {
    success: 1,
    message: "records updated",
    data: [],
    totalCount: count,
  };
};

const itemAsJsonMaker= (name,qty,price)=>{
  return {
    
    quantity:qty,
    price:{
      unit_amount:price,
      currency:"inr",

    }
  }
}
const paymentCall =async (req, res)=>{
  var data = req.body.token
  
  var items = new Map(Object.entries(data.items_detail)); // Json to map
  if (data.id.length<4) res.status(400).send({
    success:0,
    message:"something went wrong with the payment process try again!",
    errors:[]

  })
  var amount = 0
  itemArray=[]
  for (let [key, value] of items) {
    if(key!='address'){
      itemArray.push(itemAsJsonMaker(key,parseInt(items.get(key)[1]),items.get(key)[0]))
      amount += parseInt(items.get(key)[1])*items.get(key)[0]
    }
  }
  
  stripe.charges.create({
    amount:amount,
    source:data.id,
    currency:'inr',
    
    // invoice:{
    //   lines:{
    //     data:itemArray
    //   }
    // }
  
  }).then(async function() {
    console.log("success")
    
    var output = await purchaseItemsForUser(items,req.session.userName)
    if(output.success===1){
      res.status(200).send({
        success:1,
        message:"successfully paid",
        data:"",
        totalCount:""
        
      })
    }
    else{
      return output
    }
    
  }).catch(function(){
    console.log("failes")
    res.status(400).send({
      success:0,
      message:"Payment Can't be made right now",
      errors:[]
    })
  })
}
const itemsPurchased = (req,res) => {
  if(req.session.authenticated){
      const sql = `SELECT * FROM ORDERS WHERE username='${req.session.userName}' and status = 1`
  
    dbConnection.query(sql, async (error, result) => {
      if(result) {
        var size = result.length;
        return res.status(200).send({
          success: 1,
          message: "records fetched successfully",
          data: result,
          totalCount: size,
        });
      }
      else {
        return res.status(400).send({
          success: 0,
          message: "something went wrong with sql query!",
          errors:[
            {message:`${error}`}
          ]
      })
      }
})
}
else{
  return res.status(401).send({
    success: 0,
    message: "failed",
    errors: [
      { message: `either you are not authorized or you have not logged in!` },
    ],
  });
}
}

module.exports ={ itemsPurchased, paymentCall}