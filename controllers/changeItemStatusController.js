const responseGen = require('./responseGenerator')
// structuring done
// response added
const dbConnection = require("../databaseConnection");
const changeItemStatus = (req, res) => {
  if (req.session.authenticated && req.session.admin) {
    var orderId = req.body.value;
    const sql = `UPDATE ORDERS SET status=1 WHERE orderid='${orderId}';`;

    dbConnection.query(sql, async (error, result) => {
      if (result)
        responseGen.generatePositiveResponse(req,res,"recoed updated",[],1,200);
      else
        responseGen.generateNegativeResponse(req,res,"something might happened wrong with my sql",error,400);
        
    });
  } else {
    responseGen.generateNegativeResponse(req,res,"failed",`either you are not authorized or you have not logged in!`,401);
  }
};

module.exports = { changeItemStatus};