const responseGen = require("./responseGenerator");
// response added
// structuring done
const dbConnection = require("../databaseConnection");
const stripe = require("stripe")(
  "sk_test_51JxOJ3SJcXKxPen0p4hFP9iZdQq8dpU1f4unqP0rU9r5hVjisKB3XfuNjuhK7vpO8wC1YZaX3qLC6bMMPygRX8gB00bjIugpZj"
);

const purchaseItemsForUser = (req, res, data, userName) => {
  var count = 0;

  for (let [item, value] of data) {
    var address = data.get("address");
    if (item != "address") {
      console.log(address, item, userName, data.get(item)[1], 0);
      let sql = `INSERT INTO orders(address,item,username,quantity,status) values('${address}','${item}','${userName}','${
        data.get(item)[1]
      }',0)`;
      dbConnection.query(sql, (error, result) => {
        if (error) {
          responseGen.generateNegativeReponse(
            req,
            res,
            "something might happened wrong with my sql query",
            error,
            400
          );
        } else {
          count++;
        }
      });
    }
  }
  responseGen.generatePositiveReponse(
    req,
    res,
    "records updated",
    [],
    count,
    200
  );
};

const itemAsJsonMaker = (name, qty, price) => {
  return {
    quantity: qty,
    price: {
      unit_amount: price,
      currency: "inr",
    },
  };
};
const paymentCall = async (req, res) => {
  var data = req.body.token;

  var items = new Map(Object.entries(data.items_detail)); // Json to map
  if (data.id.length < 4) {
    responseGen.generateNegativeReponse(
      req,
      res,
      "something went wrong with the payment process try again!",
      [],
      400
    );
  }
  var amount = 0;
  itemArray = [];
  for (let [key, value] of items) {
    if (key != "address") {
      itemArray.push(
        itemAsJsonMaker(key, parseInt(items.get(key)[1]), items.get(key)[0])
      );
      amount += parseInt(items.get(key)[1]) * items.get(key)[0];
    }
  }

  stripe.charges
    .create({
      amount: amount,
      source: data.id,
      currency: "inr",

      // invoice:{
      //   lines:{
      //     data:itemArray
      //   }
      // }
    })
    .then(async function () {
      console.log("success");
      purchaseItemsForUser(items, req.session.userName);
    })
    .catch(function () {
      console.log("failes");
      responseGen.generateNegativeReponse(
        req,
        res,
        "Payment Can't be made right now",
        "",
        400
      );
    });
};
const itemsPurchased = (req, res) => {
  if (req.session.authenticated) {
    const sql = `SELECT * FROM ORDERS WHERE username='${req.session.userName}' and status = 1`;

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

module.exports = { itemsPurchased, paymentCall };
