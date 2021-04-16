// var ord_db = require("../data/db");
const moment = require("moment");
let orderMiddleware = require("../middleware/orders");
let delivery_controller = require("../controllers/delivery_controller");
let payment_controller = require("../controllers/payment_controller");
const pool = require("../data/pool");
/*
 * register new order
 * register new payment
 * register new delivery
 * register order_list
 */

// 오류 가능성 많음......ㅜ
exports.create_order = function(req, res, next) {
  const ord_data = {
    order_id: "",
    user_id: req.body.ord.user_id,
    tot_price: req.body.ord.tot_price,
    order_description: req.body.ord.order_description
  };
  ord_data.order_id = orderMiddleware.createOrderId(ord_data.user_id);
  ord_data.registered = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  const sql = "INSERT INTO `order` SET ?";
  //auto created
  //order_id
  pool.query(sql, ord_data, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR - while updating order data",
        code: "fail",
        result: err
      });
    }

    /////////////////////////////////////////////////
    /**
     * create new payment
     */
    const payment_id = orderMiddleware.createPaymentId(
      ord_data.order_id,
      ord_data.user_id
    );
    const pay_data = {
      order_id: ord_data.order_id,
      payment_id: payment_id,
      amount: ord_data.tot_price + 2500
    };
    payment_controller.create_payment(pay_data);

    /**
     * create new delivery
     */
    const delivery_id = orderMiddleware.createDeliveryId(
      ord_data.order_id,
      ord_data.user_id
    );
    const deliv_data = {
      order_id: ord_data.order_id,
      delivery_id: delivery_id
    };
    delivery_controller.create_delivery(deliv_data);

    //변수명이 어떻게 들어가게 되는지 확인!
    /**
     * register ordered product to order_detail
     */
    const order_list = req.body.ord.order_list;
    order_list.forEach(function(list, index) {
      list.push(ord_data.order_id);
    });
    const order_list_sql =
      "INSERT INTO order_detail (prod_id, prod_cnt, tot_price, order_id) VALUES ?;";
    pool.query(order_list_sql, [order_list], function(err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }
    });
    /////////////////////////////////////////////////
    res.status(201).send({
      msg: "new order is registered successfully",
      code: "success"
    });
  });
};

// get and send the list of all orders
// payment and delivery status should appear
// 오류 가능성 있음.
// 보내주는 컬럼
// order_id, registered(날짜), user_id, payment 와 delivery의 배송 상태 --> 한글로: status !
// 보내주는 데이터를 status_index 로 바꾸고 싶으면 말씀해 주세요!
exports.get_list = function(req, res) {
  const sql = "SELECT o.*, ps.status AS payment_status, ds.status AS delivery_status, p.paid AS paid " +
    "FROM payment p LEFT JOIN payment_status ps " +
    "ON p.status_index = ps.index " +
    "INNER JOIN `order` o " +
    "ON o.order_id = p.order_id " +
    "INNER JOIN delivery d " +
    "ON o.order_id = d.order_id " +
    "LEFT JOIN delivery_status ds " +
    "ON d.status_index = ds.index";

  pool.query(sql, function(err, result) {
    if (err) {
      console.log(sql);
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no order",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "order data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete the list of all orders
// and also from payment and delivery list
exports.delete_list = function(req, res) {
  const sql =
    "DELETE " +
    "FROM `order` o INNER JOIN payment p INNER JOIN delivery d " +
    "ON o.order_id = p.order_id AND o.order_id = d.order_id";
  pool.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "orders, payment and delivery data has been deleted all",
      code: "success"
    });
  });
};

// get and send a specific user's orders
exports.get_user_order = function(req, res) {
  const ord_data = {
    user_id: req.params.user_id
  };
  // send payment and delivery data too
  // payment_id, delivery_id 줄것.
  const sql =
    "SELECT o.*, p.payment_id, d.delivery_id " +
    "FROM `order` o INNER JOIN payment p INNER JOIN delivery d " +
    "ON o.user_id=? AND o.order_id = p.order_id AND o.order_id = d.order_id";

  pool.query(sql, [ord_data.user_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no order having the user_id",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "order data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete a specific user's orders
exports.delete_user_order = function(req, res) {
  const ord_data = {
    user_id: req.params.user_id
  };
  // delete user's payment, delivery data too
  const sql =
    "DELETE o, p, d " +
    "FROM `order` o INNER JOIN payment p INNER JOIN delivery d " +
    "ON o.user_id = ? AND o.order_id = p.order_id AND o.order_id = d.order_id";
  pool.query(sql, [ord_data.user_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "orders, payment and delivery data has been deleted all",
      code: "success"
    });
  });
};

//넘겨주는 데이터
//order 의 모든 column, payment_id, delivery_id
exports.get_detail = function(req, res) {
  const ord_data = {
    order_id: req.params.id
  };
  //
  const sql =
    "SELECT o.*, p.payment_id, d.delivery_id " +
    "FROM `order` o INNER JOIN payment p INNER JOIN delivery d " +
    "ON o.order_id=? AND o.order_id = p.order_id AND o.order_id = d.order_id";

  pool.query(sql, [ord_data.order_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no order having the order_id",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "order data has been sent",
      code: "success",
      result: result
    });
  });
};

// update a specific order
//삭제  - 바꿀 수 있는 것이 없음.
// exports.update_order = function(req, res) {};

// delete a specific order
exports.delete_order = function(req, res) {
  const ord_data = {
    order_id: req.params.id
  };
  //
  const sql =
    "DELETE o, p, d " +
    "FROM `order` o INNER JOIN payment p INNER JOIN delivery d " +
    "ON o.order_id = ? AND o.order_id = p.order_id AND o.order_id = d.order_id";
  pool.query(sql, [ord_data.order_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "orders, payment and delivery data with the id has been deleted all",
      code: "success"
    });
  });
};

// update the order status: cancel the order -->
// upcate payment status to 주문취소
exports.cancel_order = function(req, res) {
  const ord_data = {
    order_id: req.params.id
  };
  const sql = "UPDATE payment SET stats_index=3 WHERE order_id=?";

  // 결제 대기인지 검색
  pool.query(
    "SELECT status_index FROM payment WHERE order_id=?",
    [ord_data.order_id],
    function(err, reuslt) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR - while reading payment data",
          code: "fail",
          result: err
        });
      }
      if (!result[0]) {
        return res.status(401).send({
          msg: "There is no payemtn data having the order_id",
          code: "fail"
        });
      }

      // 결제 대기 일때만 주문 취소 가능
      else if (result[0].status_index === 1) {
        pool.query(sql, [ord_data.order_id], function(err, result) {
          if (err) {
            return res.status(500).send({
              msg: "database ERROR - while updating payment status",
              code: "fail",
              result: err
            });
          }

          return res.status(200).send({
            msg: "payment status has been updated to 주문 취소",
            code: "success"
          });
        });
      } else {
        return res.status(400).send({
          msg: "cannot cancel the order. payment status is not 결제 대기",
          code: "fail"
        });
      }
    }
  );
};

// get and send a specific order
// order_detail db 사용
exports.get_ordered_products = function(req, res) {
  const ord_data = {
    order_id: req.params.id
  };
  //key 값을 order_id 로 해야함.
  // 한 order_id 에 여러개의 product 가 딸려있는 형태
  // e.g) 주문을 할때 여러개의 물건을 산다.
  const sql =
    "SELECT o.order_id, od.prod_id, p.prod_name, p.image_path, od.prod_cnt, od.tot_price, o.registered " +
      "FROM (order_detail od LEFT JOIN product p ON od.prod_id = p.prod_id) " +
      "LEFT JOIN `order` o ON o.order_id = od.order_id " +
      "WHERE o.order_id=?";

  pool.query(sql, [ord_data.order_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no such order",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "the order data has been sent",
      code: "success",
      result: result
    });
  });
};

// // add new ordered product to order detail
// // should calculate tot_price again and update payment .
// exports.create_ordered_product = function(req, res) {

// };

// // update ordered product's data
// // prod_cnt, tot_price
// // should calculate tot_price again and update payment .
// exports.update_ordered_product = function(req, res) {};

// // delete ordered product from order detail
// // should calculate tot_price again and update payment .
// exports.delete_ordered_product = function(req, res) {};

// payment와 delivery에 중복되는 function
// // get and send orders having the payment status index
// exports.get_status_payment = function(req, res) {};

// // delete orders having the payment status index
// exports.delete_status_payment = function(req, res) {};

// // get and send orders having the delivery status index
// exports.get_status_delivery = function(req, res) {};

// // delete orders having the delivery status index
// exports.delete_status_delivery = function(req, res) {};
