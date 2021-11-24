//structuring done
// response added
const responseGen = require('./responseGenerator')
const dbConnection = require("../databaseConnection");
const itemsPending = (req, res) => {
  if (req.session.authenticated && req.session.admin) {
    const sql = "SELECT * FROM ORDERS WHERE status=0;";

    dbConnection.query(sql, async (error, result) => {
      if (result) {
        var size = result.length;
        responseGen.generatePositiveReponse(
          req,
          res,
          "records fetched successfully",
          result,
          size,
          200
        );
      } else {
        responseGen.generateNegativeReponse(
          req,
          res,
          "something might happened wrong with my sql query!",
          error,
          400
        );
      }
    });
  } else {
    responseGen.generateNegativeReponse(
      req,
      res,
      "failed",
      `either you are not authorized or you have not logged in!`,
      401
    );
  }
};

module.exports = { itemsPending };
