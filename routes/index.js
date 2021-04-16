var express = require("express");
var router = express.Router();
var path = require("path");

// var items = require("./items");
var alarms = require("./alarms");
var categories = require("./categories");
var deliveries = require("./deliveries");
var inquiries = require("./inquiries");
var orders = require("./orders");
var payments = require("./payments");
var products = require("./products");
var users = require("./users");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// router.use("/items", items);

router.use("/alarms", alarms);
router.use("/categories", categories);
router.use("/deliveries", deliveries);
router.use("/inquiries", inquiries);
router.use("/orders", orders);
router.use("/payments", payments);
router.use("/products", products);
router.use("/users", users);

module.exports = router;
