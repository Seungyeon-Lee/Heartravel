var express = require("express");
var router = express.Router();

var product_controller = require("../../controllers/product_controller");

/// PRODUCT ROUTES ///

/* POST new product data */
router.post("/", product_controller.create_prod);

/* GET all product list*/
router.get("/", product_controller.get_list);

/* DELETE all product data */
router.delete("/", product_controller.delete_list);

/* GET a product data by id */
router.get("/:id", product_controller.get_detail);

/* PUT(UPDATE) a product data by id */
router.put("/:id", product_controller.update_product);

/* DELETE a product data by id */
router.delete("/:id", product_controller.delete_product);

/* GET products data by category */
router.get("/categ/:idx", product_controller.get_list_categ);

/* DELETE products data by category */
router.delete("/categ/:idx", product_controller.delete_list_categ);

/* GET products data by product type */
router.get("/type/:idx", product_controller.get_list_type);

/* DELETE products data by product type */
router.delete("/type/:idx", product_controller.delete_list_type);

/* GET products data by product status */
router.get("/status/:idx", product_controller.get_list_status);

/* DELETE products data by product status */
router.delete("status/:idx", product_controller.delete_list_status);

module.exports = router;
