var express = require("express");
var router = express.Router();
var order_controller = require("../../controllers/order_controller");

/// ORDERS ROUTES ///

/* POST new order data */
router.post("/", order_controller.create_order);

/* GET all order list*/
router.get("/", order_controller.get_list);

/* DELETE all order list */
router.delete("/", order_controller.delete_list);

/* GET order data by user_id */
router.get("/user/:user_id", order_controller.get_user_order);

/* DELETE order data by id */
router.delete("/user/:user_id", order_controller.delete_user_order);

/* GET an order data by id */
router.get("/:id", order_controller.get_detail);

/* DELETE an order data by id */
router.delete("/:id", order_controller.delete_order);

/* PUT(UPDATE) order status (= payment status) to cancel */
router.put("/:id/cancel", order_controller.cancel_order);

/* POST new ordered product */
router.get("/detail/:id", order_controller.get_ordered_products);

// /* GET ordered product data */
// router.get("/detail/:id", order_controller.get_product_detail);

// /* PUT(UPDATE) ordered product data */
// router.put("/detail/:id/:prod_id", order_controller.update_product_detail);

// /* DELETE ordered product data */
// router.delete("/detail/:id/:prod_id", order_controller.delete_product_detail);

/* GET orders data by payment status idx */
// router.get("/payment/:idx", order_controller.get_status_payment);

// /* PUT(UPDATE) orders data by payment status idx */
// router.put("/payment/:idx", order_controller.delete_list_categ);

/* DELETE orders data by payment status idx */
// router.delete("/payment/:idx", order_controller.delete_status_payment);

/* GET orders data by delivery status idx */
// router.get("/delivery/:idx", order_controller.get_status_delivery);

// /* PUT(UPDATE) orders data by delivery status idx */
// router.put("/delivery/:idx", order_controller.delete_list_type);

/* DELETE orders data by delivery status idx */
// router.delete("/delivery/:idx", order_controller.delete_status_delivery);

module.exports = router;
