// structuring done
const dbConnection = require('../databaseConnection')

const packItemIntoJsonObject = (name,amount,quantity)=>{
  var item = { 
    price_data:{
      currency: 'inr',
      product_data:{
        name: name,
      },
      unit_amount:amount *100,
    },
    quantity:quantity,
  }
  return item
}

const paymentConfigure = (req, res)=>{
  var transaction_id = req.body.transaction_id
  var item = req.body.item
  var quantity = req.body.quantity
  var price = req.body.price
  var date = req.body.date
  console.log(transaction_id,item,quantity,price,date)
  if(req.session.authenticated){
    const sql = `INSERT INTO PAYMENTS VALUES('${transaction_id}','${item}','${quantity}','${price}','${date}');`

  dbConnection.query(sql, async (error, result) => {
    if(result) {
      var size = result.length;
      return res.status(200).send({
        success: 1,
        message: "record added successfully",
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
const paymentCall =async (req, res)=>{
  
  const stripe = require('stripe')('sk_test_51JxOJ3SJcXKxPen0p4hFP9iZdQq8dpU1f4unqP0rU9r5hVjisKB3XfuNjuhK7vpO8wC1YZaX3qLC6bMMPygRX8gB00bjIugpZj')
  var total = 0
  var products = new Map(Object.entries(req.body.data)); // Json to Map
  var items = []
  //console.log(products)
  for (let [key, value] of products) {
      if(key!='address') items.push( packItemIntoJsonObject(key,products.get(key)[0],parseInt(products.get(key)[1])))
    }
  if(items.length<1) return

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items:items,
    mode: 'payment',
    success_url: 'http://localhost:3000/app/user/orderplaced',
    cancel_url: 'http://localhost:3000/app/login'
  })
  res.json({
    id:session.id
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

module.exports ={ itemsPurchased, paymentCall , paymentConfigure }