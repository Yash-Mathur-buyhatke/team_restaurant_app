// structuring done
const dbConnection = require("../databaseConnection");
const orderPlacedPage = (req, res) => {
  if (req.session.authenticated) return res.status(200).render("orderPlaced");
  else
    res.status(401).send({
      success: 0,
      message: "failed",
      errors: [
        { message: `either you are not authorized or you have not logged in!` },
      ],
    });
};
const purchaseItemsPage = (req, res) => {
  if (req.session.authenticated) return res.status(200).render("purchaseItems");
  else
    res.status(401).send({
      success: 0,
      message: "failed",
      errors: [
        { message: `either you are not authorized or you have not logged in!` },
      ],
    });
};

const historyPage = (req, res) => {
  if (req.session.authenticated) return res.status(200).render("history");
  else
    res.status(401).send({
      success: 0,
      message: "failed",
      errors: [
        { message: `either you are not authorized or you have not logged in!` },
      ],
    });
};

const purchaseItemsForUser = (req, res) => {
  if (req.session.authenticated == false)
    return res.status(401).send({
      success: 0,
      message: "failed",
      errors: [
        { message: `either you are not authorized or you have not logged in!` },
      ],
    });
  var count = 0;
  var data = new Map(Object.entries(req.body.data)); // Json to Map

  for (let [item, value] of data) {
    var address = data.get("address");
    if (item != "address") {
      let sql = `INSERT INTO orders(address,item,username,quantity,status) values('${address}','${item}','${
        req.session.userName
      }','${data.get(item)[1]}',0)`;
      dbConnection.query(sql, (error, result) => {
        if (error) {
          return res.status(400).send({
            success: 0,
            message: "Something might happend wrong with my sql query!",
            errors: [{ message: `${error}` }],
          });
        } else {
          count++;
        }
      });
    }
  }
  return res.status(200).send({
    success: 1,
    message: "record updated",
    data: [],
    totalCount: count,
  });
};

module.exports = {
  purchaseItemsPage,
  historyPage,
  purchaseItemsForUser,
  orderPlacedPage,
};
