var express = require("express");
var router = express.Router();

// Require controller modules
var user_controller = require("../../controllers/user_controller");

/// USER ROUTES ///

/* GET all user data */
router.get("/", user_controller.get_list);

/* DELETE all user data */
router.delete("/", user_controller.delete_list);

/* GET an user data by id */
router.get("/:id", user_controller.get_detail);

/* PUT(UPDATE) an user data by id */
router.put("/:id", user_controller.update_user);

/* DELETE an user data by id */
router.delete("/:id", user_controller.delete_user);

/* PUT new pw */
router.put("/:id/new-pw", user_controller.update_newpw);

/* GET users data by status */
router.get("/status/:idx", user_controller.get_list_status);

/* DELETE users data by status */
router.delete("/status/:idx", user_controller.delete_list_status);

/* GET users data by role */
router.get("/role/:idx", user_controller.get_list_role);

/* DELETE users data by role */
router.delete("/role/:idx", user_controller.delete_list_role);

/* POST login */
router.post("/login", user_controller.create_login);

/* POST sign-up new user */
router.post("/sign-up", user_controller.create_newuser);

/* GET an user data to check & send mail to user */
router.get("/find/id", user_controller.get_id_info);

/* GET an user data to check & send mail to user */
router.get("/find/pw", user_controller.get_pw_info);

module.exports = router;

/* GET a verification code to check if it's right */
// router.get('/find/code', user_controller);
