// structuring done
// reponse added
const responseGen = require("./responseGenerator");
const dbConnection = require("../databaseConnection");
const itemsForSell = (req, res) => {
  if (req.session.authenticated) {
    const sql = "SELECT * FROM ITEMS;";
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
          "something might happened wrong with my sql query",
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

module.exports = { itemsForSell };
