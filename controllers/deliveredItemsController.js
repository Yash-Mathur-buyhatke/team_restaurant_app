
// structuring done
const dbConnection = require("../databaseConnection");
const itemsToBeDelivered = (req, res) => {
  if (req.session.authenticated && req.session.admin) {
    var orderId = req.body.value;
    const sql = `UPDATE ORDERS SET status=1 WHERE orderid='${orderId}';`;

    dbConnection.query(sql, async (error, result) => {
      if (result)
        res.status(200).send({
          success: 1,
          message: "record updated",
          data: [],
          totalCount: 1,
        });
      else
        res.status(400).send({
          success: 0,
          message: "Something might happend wrong with my sql query!",
          errors: [{ message: `${error}` }],
        });
    });
  } else {
    res.status(401).send({
      success: 0,
      message: "failed",
      errors: [
        { message: `either you are not authorized or you have not logged in!` },
      ],
    });
  }
};

module.exports = { itemsToBeDelivered };
