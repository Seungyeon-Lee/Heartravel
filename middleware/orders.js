// var db = require("../data/db.js");
var moment = require("moment");
const pool = require("../data/pool");
module.exports = {
  /**
   * make order id
   */
  createOrderId: (user_id, next) => {
    //order_id should start with 5
    var order_id = "5";

    //get index and add index
    var sql = "SELECT MAX(`index`) AS max FROM order";
    pool.query(sql, function(err, result) {
      if (err) {
        console.log(err);
        return result.status(500).send({
          msg: "database ERROR - while getting max index",
          code: "fail",
          result: err
        });
      }
      if (result[0].max < 10) {
        order_id += "000";
      } else if (result[0].max < 100) {
        order_id += "00";
      } else if (result[0].max < 1000) {
        order_id += "0";
      }
      order_id += (result[0].max + 1).toString();
    });

    var sql = "SELECT `index` FROM user WHERE user_id=?";
    //add the user index
    pool.query(sql, [user_id], function(err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send({
          msg: "database ERROR - while getting user index",
          code: "fail",
          result: err
        });
      }
      order_id += result[0].index.toString();
    });

    //add user's order cnt
    var sql = "SELECT COUNT(*) AS cnt FROM order WHERE user_id=?";
    pool.query(sql, [user_id], function(err, result) {
      if (err) {
        console.log(err);
        return result.status(500).send({
          msg: "database ERROR - while getting user order count",
          code: "fail",
          result: err
        });
      }
      if (result[0].cnt < 10) {
        order_id += "0";
      }
      order_id += (result[0].cnt + 1).toString();
    });

    return order_id;
  },

  /**
   * make payment id
   */
  createPaymentId: (order_id, user_id) => {
    //payment_id should start with character
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var payment_id = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );

    // add order index
    payment_id += order_id.slice(1, 5);

    // add one digit random number
    payment_id += parseInt(Math.random() * 10);

    //add the user index
    var sql = "SELECT `index` FROM user WHERE user_id=?";
    pool.query(sql, [user_id], function(err, result) {
      if (err) {
        return result.status(500).send({
          msg: "database ERROR - while getting user index",
          code: "fail",
          result: err
        });
      }
      payment_id += result[0].index.toString();
    });

    return payment_id;
  },

  /**
   * make delivery id
   */
  createDeliveryId: (order_id, user_id) => {
    //delivery_id should start with 4
    var delivery_id = "4";
    // add order index
    delivery_id += order_id.slice(1, 5);

    // add one digit random number
    delivery_id += parserInt(Math.random() * 10);

    //add the user index
    var sql = "SELECT `index` FROM user WHERE user_id=?";
    pool.query(sql, [user_id], function(err, result) {
      if (err) {
        return result.status(500).send({
          msg: "database ERROR - while getting user index",
          code: "fail",
          result: err
        });
      }
      delivery_id += result[0].index.toString();
    });

    return delivery_id;
  }
};
