var express = require("express");
var router = express.Router();
var payment_controller = require("../../controllers/payment_controller");
var paymentMiddleware = require("../../middleware/payments");

/// PAYMENT ROUTES ///

/* POST create new payment data */
// router.post("/", payment_controller.create_payment);

/* GET all payment data */
router.get("/", payment_controller.get_list);

/* DELETE all payment data */
router.delete("/", payment_controller.delete_list);

/* GET payment data by id */
router.get("/:id", payment_controller.get_detail);

/* PUT(UPDATE) payment data by id */
router.put("/:id", payment_controller.update_detail);

/* DELETE payment data by id */
router.delete("/:id", payment_controller.delete_payment);

/* PUT(CHANGE) payment's status by id*/
router.put(
  "/:id/status",
  paymentMiddleware.IdValidChk,
  payment_controller.update_status
);

/* GET payment data by payment status */
router.get("/status/:idx", payment_controller.get_list_status);

/* DELETE payment data by payment status */
router.delete("/status/:idx", payment_controller.delete_list_status);

module.exports = router;
