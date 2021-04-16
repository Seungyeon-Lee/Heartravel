// var pay_db = require("../data/db");
// var db = require("../data/db");
const pool = require("../data/pool");
const moment = require("moment");

//register new payment
//only can be called by registration of order
// 에러 가능성 있음.
exports.create_payment = function(pay_data) {
  const sql = "INSERT INTO payment SET ?";
  pay_data.registerd = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  pool.query(sql, pay_data, function(err, res) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(201).send({
      msg: "new payment is registered successfully",
      code: "success"
    });
  });
};

// get and send list of all payments
exports.get_list = function(req, res) {
  const sql = "SELECT * FROM payment";

  pool.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no payment data",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "payment data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete list of all payments
exports.delete_list = function(req, res) {
  const sql = "DELETE FROM payment";
  pool.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "all payment data has been deleted all",
      code: "success"
    });
  });
};

// get a specific payment data with the id
exports.get_detail = function(req, res) {
  const pay_data = {
    payment_id: req.params.id
  };
  const sql = "SELECT * FROM payment WHERE payment_id=?";

  pool.query(sql, [pay_data.payment_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no such payment data",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "the payment data has been sent",
      code: "success",
      result: result
    });
  });
};

// update for a specific payment data
// can change amount
exports.update_detail = function(req, res) {
  const pay_data = {
    payment_id: req.params.id,
    amount: req.body.payment.amount
  };
  const sql = "UPDATE payment SET amount=? WHERE payment_id =? ";

  pool.query(sql, [pay_data.amount, pay_data.payment_id], function(err, res) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "the payment detail data has been updated",
      code: "success"
    });
  });
};

// delete a specific payment data by id
exports.delete_payment = function(req, res) {
  const pay_data = {
    payment_id: req.params.id
  };
  const sql = "DELETE FROM payment WHERE payment_id=?";
  pool.query(sql, [pay_data.payment_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "the payment data has been deleted",
      code: "success"
    });
  });
};

// update payment status with payments id
// user: 주문취소, admin: 다
// 오류 가능성 있음.
exports.update_status = function(req, res) {
  const pay_data = {
    payment_id: req.params.id,
    status_index: req.body.payment.status_index
  };
  let sql = "UPDATE payment SET status_index=?, is_paid=? WHERE payment_id=?";
  pool.query(
      "SELECT status_index FROM payment WHERE payment_id=?",
      [pay_data.payment_id],
      function (err, result) {
        if (err) {
          return res.status(500).send({
            msg: "database ERROR",
            code: "fail",
            result: err
          });
        } else {
          let is_paid = (pay_data.status_index === 1) ? 0 : 1;
          pool.query(sql, [pay_data.status_index, is_paid, pay_data.payment_id], function (err, result) {
            if (err) {
              return res.status(500).send({
                msg: "database ERROR - while updating payment status to 결제완료",
                code: "fail",
                result: err
              });
            }

            return res.status(200).send({
              msg: "the payment status and delivery status has been updated",
              code: "success"
            });
          });
        }
      });
};

// get and send payments data using payments status
exports.get_list_status = function(req, res) {
  const status_index = req.params.idx;

  if(status_index === '2') {
    let sql =
        "SELECT o.*, u.user_id, u.user_name, p.payment_id, p.status_index payment_status, " +
        "d.status_index delivery_status, d.delivery_id " +
        "FROM `order` o LEFT JOIN user u " +
        "ON o.user_id = u.user_id " +
        "LEFT JOIN payment p " +
        "ON o.order_id = p.order_id " +
        "LEFT JOIN delivery d " +
        "ON o.order_id = d.order_id " +
        "WHERE p.status_index=? AND d.status_index=?";

    pool.query(sql, [2, 1], function (err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      if (!result[0]) {
        return res.status(401).send({
          msg: "cannot find the payment data with the status",
          code: "fail"
        });
      }

      return res.status(200).send({
        msg: "the payment data has been sent",
        code: "success",
        result: result
      });
    });
  }
  else {
    let sql =
        "SELECT o.*, u.user_id, u.user_name, p.payment_id, p.status_index " +
        "FROM `order` o LEFT JOIN user u " +
        "ON o.user_id = u.user_id " +
        "LEFT JOIN payment p " +
        "ON o.order_id = p.order_id " +
        "WHERE p.status_index = ?";

    if(status_index === '3') sql += " OR p.status_index=4";

    pool.query(sql, [status_index], function (err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      if (!result[0]) {
        return res.status(401).send({
          msg: "cannot find the payment data with the status",
          code: "fail"
        });
      }

      return res.status(200).send({
        msg: "the payment data has been sent",
        code: "success",
        result: result
      });
    });
  }
};

// delete all payments data using payments status
exports.delete_list_status = function(req, res) {
  const status_index = req.params.idx;
  const sql = "DELETE * FROM payment WHERE status_index=?";
  pool.query(sql, [status_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "payment data has been deleted",
      code: "success"
    });
  });
};
