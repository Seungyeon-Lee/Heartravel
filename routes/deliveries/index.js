var express = require("express");
var router = express.Router();
var delivery_controller = require("../../controllers/delivery_controller");
var deliveryMiddleware = require("../../middleware/deliveries");
/// DELIVERY ROUTES ///

/* POST create new delivery data */
// router.post("/", delivery_controller.create_delivery);

/* GET all delivery data */
router.get("/", delivery_controller.get_list);

/* DELETE all delivery data */
router.delete("/", delivery_controller.delete_list);

/* GET a delivery data by id */
router.get("/:id", delivery_controller.get_detail);

/* PUT(UPDATE) a delivery data by id - receiver data */
router.put(
  "/:id",
  //deliveryMiddleware.deliveryStatusChk,
  delivery_controller.update_detail
);

/* DELETE a delivery data by id */
router.delete("/:id", delivery_controller.delete_delivery);

/* PUT(CHANGE) a delivery's status by id*/
router.put("/:id/status", delivery_controller.update_status);

/* UPDATE invoice number */
router.put("/:id/invoice_n_company", delivery_controller.update_invoice);

/* GET a delivery data by invoice number */
router.get("/invoice/:num", delivery_controller.get_invoice);

/* GET deliveries data by delivery status */
router.get("/status/:idx", delivery_controller.get_list_status);

/* DELETE deliveries data by delivery status */
router.delete("/status/:idx", delivery_controller.delete_list_status);

module.exports = router;
