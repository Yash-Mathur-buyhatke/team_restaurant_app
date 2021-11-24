const responseGen = require("./responseGenerator");
const dbConnection = require("../databaseConnection");
const insertNewItem = (req, res) => {
    //TODO: make this function like that it can insert multiple data at a single time sent by user
  //if (req.session.authenticated) {
    const sql = "INSERT INTO ITEMS VALUES('pizza',23);";
    dbConnection.query(sql, async (error, result) => {
      if (result) {
        var size = result.length;
        responseGen.generatePositiveResponse(
          req,
          res,
          "record added successfully",
          result,
          size,
          200
        );
      } else {
        responseGen.generateNegativeResponse(
          req,
          res,
          "something might happened wrong with my sql query",
          error,
          400
        );
      }
    });
//   } else {
//     responseGen.generateNegativeResponse(
//       req,
//       res,
//       "failed",
//       `either you are not authorized or you have not logged in!`,
//       401
//     );
//   }
};

module.exports = { insertNewItem };
