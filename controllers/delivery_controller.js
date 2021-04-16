// var deliv_db = require("../data/db");
const pool = require("../data/pool");
const moment = require("moment");

//register new delivery
// only can be called by registration of order
// 에러 가능성 있음.
exports.create_delivery = function(deliv_data) {
  const sql = "INSERT INTO delivery SET ?";
  deliv_data.registerd = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  pool.query(sql, deliv_data, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(201).send({
      msg: "new delivery is registered successfully",
      code: "success"
    });
  });
};

// get and send list of all deliveries
exports.get_list = function(req, res) {
  const sql = "SELECT * FROM delivery";

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
        msg: "There is no delivery data",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "delivery data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete list of all deliveries
exports.delete_list = function(req, res) {
  const sql = "DELETE FROM delivery";
  pool.query(sql, function(err) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "all delivery data has been deleted",
      code: "success"
    });
  });
};

// get a specific delivery data with the id
// 오류 가능성 있음.
// join with delivery_detail
exports.get_detail = function(req, res) {
  const deliv_data = {
    delivery_id: req.params.id
  };
  const sql =
    "SELECT d.*, dd.receiver_name, dd.receiver_phone, dd.emerge_phone, dd.receiver_postcode, dd.receiver_address, dd.receiver_address_detail, dd.receiver_request " +
    "FROM delivery d, delivery_detail dd " +
    "WHERE d.delivery_id = dd.delivery_id " +
    "AND d.delivery_id=?";

  // delivery_detail: 배송아이디, 받는사람 정보
  pool.query(sql, [deliv_data.delivery_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no such delivery data",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "the delivery data has been sent",
      code: "success",
      result: result
    });
  });
};

// update for a specific delivery data
// only user uses it
// 오류 가능성 있음.
exports.update_detail = function(req, res) {
  const delivery_id = req.params.id;
  const deliv_data = {
    receiver_name: req.body.receiver.name,
    receiver_phone: req.body.receiver.phone,
    emerge_phone: req.body.receiver.emerge_phone,
    receiver_postcode: req.body.receiver.postcode,
    receiver_address: req.body.receiver.address,
    receiver_address_detail: req.body.receiver.address_detail,
    receiver_request: req.body.receiver.request
  };
  const sql = "UPDATE delivery_detail SET ? WHERE delivery_id=?";
  pool.query(sql, [deliv_data, delivery_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "the delivery detail data has been updated",
      code: "success",
      result:result
    });
  });
};

// delete a specific delivery data by id
exports.delete_delivery = function(req, res) {
  const deliv_data = {
    delivery_id: req.params.id
  };
  const sql = "DELETE FROM delivery WHERE delivery_id=?";
  pool.query(sql, [deliv_data.delivery_id], function(err) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "the delivery data has been deleted",
      code: "success"
    });
  });
};

// update delivery status with delivery id
// only admin uses it
exports.update_status = function(req, res) {
  const deliv_data = {
    delivery_id: req.params.id,
    status_index: req.body.status_index
  };
  var sql = "UPDATE delivery SET status_index=? WHERE delivery_id=?";
  //배송완료로 변경시
  if (deliv_data.status_index === 4) {
    deliv_data.is_delivered = 1;
    deliv_data.delivered = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    sql =
      "UPDATE delivery SET status_index=?, is_delivered=?, delivered=? WHERE delivery_id=?";
    pool.query(
      sql,
      [
        deliv_data.status_index,
        deliv_data.is_delivered,
        deliv_data.delivered,
        deliv_data.delivery_id
      ],
      function(err, result) {
        if (err) {
          return res.status(500).send({
            msg: "database ERROR",
            code: "fail",
            result: err
          });
        }

        return res.status(200).send({
          msg: "the delivery status has been updated to 배송완료",
          code: "success",
          result: result
        });
      }
    );
  }

  pool.query(sql, [deliv_data.status_index, deliv_data.delivery_id], function(
    err,
    result
  ) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "the delivery status has been updated",
      code: "success",
      result: result
    });
  });
};

// register invoice number and delivery company with delivery status
exports.update_invoice = function(req, res) {
  const deliv_data = {
    //변수 어떻게 줄것인지 생각해 봐야 할 것 같다..
    delivery_id: req.params.id,
    invoice_num: req.body.delivery.invoice_num,
    status_index: req.body.delivery.status_index,
    delivery_company: req.body.delivery.delivery_company
  };
  const sql =
    "UPDATE delivery SET invoice_num=?, delivery_company=?, " +
    "status_index=? WHERE delivery_id=?";

  pool.query(
    sql,
    [
      deliv_data.invoice_num,
      deliv_data.delivery_company,
      deliv_data.status_index,
      deliv_data.delivery_id
    ],
    function(err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      return res.status(200).send({
        msg: "invoice number, delivery company and status data has been sent",
        code: "success",
        result: result
      });
    }
  );
};

// get and send delivery data by invoice number
exports.get_invoice = function(req, res) {
  const deliv_data = {
    invoice_num: req.params.num
  };
  const sql = "SELECT * FROM delivery WHERE invoice_num=?";

  pool.query(sql, [deliv_data.invoice_num], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no such invoice number",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "the delivery data has been sent",
      code: "success",
      result: result
    });
  });
};

// get and send delivery data using delivery status
exports.get_list_status = function(req, res) {
  const status_index = req.params.idx;
  const sql =
    "SELECT o.*, u.user_id, u.user_name, d.delivery_id, d.status_index, d.invoice_num, d.delivery_company " +
    "FROM `order` o LEFT JOIN user u " +
    "ON o.user_id = u.user_id " +
    "LEFT JOIN delivery d " +
    "ON o.order_id = d.order_id " +
    "WHERE d.status_index = ?";
  pool.query(sql, [status_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "cannot find the delivery data with the status",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "the delivery data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete all delivery data using delivery status
exports.delete_list_status = function(req, res) {
  const status_index = req.params.idx;
  const sql = "DELETE * FROM delivery WHERE status_index=?";
  pool.query(sql, [status_index], function(err) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "delivery data has been deleted",
      code: "success"
    });
  });
};
