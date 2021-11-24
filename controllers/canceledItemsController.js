
const responseGen = require('./responseGenerator')
// structuring done
// response added
const dbConnection = require("../databaseConnection");
const canceledItems = (req, res) => {
  if (req.session.authenticated && req.session.admin) {
    var orderId = req.body.value;
    const sql = `SELECT * FROM ORDERS WHERE orderid='${orderId}' AND STATUS=-1;`;

    dbConnection.query(sql, async (error, result) => {
      if (result)
        responseGen.generatePositiveResponse(req,res,"records fetched",result,result.length,200);
      else
        responseGen.generateNegativeResponse(req,res,"something might happened wrong with my sql",error,400);
        
    });
  } else {
    responseGen.generateNegativeResponse(req,res,"failed",`either you are not authorized or you have not logged in!`,401);
  }
};

module.exports = { canceledItems };
