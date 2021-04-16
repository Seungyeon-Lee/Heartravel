var express = require("express");
var router = express.Router();

var category_controller = require("../../controllers/category_controller");

/// CATEGORIES ROUTES ///

/* POST new category data */
router.post("/", category_controller.create_categ);

/* GET all category list*/
router.get("/", category_controller.get_list);

/* DELETE all category data */
router.delete("/", category_controller.delete_list);

/* GET a cateogry data by index(=id) */
router.get("/:id", category_controller.get_detail);

/* PUT(UPDATE) a category data by index(=id) */
router.put("/:id", category_controller.update_categ);

/* DELETE a category data by index(=id) */
router.delete("/:id", category_controller.delete_categ);

/* PUT(UPDATE) a category status by index(=id) */
router.put("/:id/status", category_controller.update_status);

router.put("/update/order", category_controller.update_order);

module.exports = router;
