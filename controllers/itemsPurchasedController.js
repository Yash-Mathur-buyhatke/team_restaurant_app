// structuring done
const dbConnection = require('../databaseConnection')

const paymentCall =async (req, res)=>{
  console.log("here")
  const stripe = require('stripe')('sk_test_51JxOJ3SJcXKxPen0p4hFP9iZdQq8dpU1f4unqP0rU9r5hVjisKB3XfuNjuhK7vpO8wC1YZaX3qLC6bMMPygRX8gB00bjIugpZj')
  const product = req.body
  console.log(product)
  console.log(product[0])
  console.log(product[1])
  console.log(product.name,product.amount,product.quantity)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items:[
      { 
        price_data:{
          currency: 'inr',
          product_data:{
            name: "iphone3",
            
          },
          unit_amount:1 *100,

        },
        quantity:1,
      },
    ],
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

module.exports ={ itemsPurchased, paymentCall}