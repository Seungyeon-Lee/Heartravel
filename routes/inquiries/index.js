var express = require("express");
var router = express.Router();

var inquiry_controller = require("../../controllers/inquiry_controller");

/// INQUIRY ROUTES ///

/* GET all inquiry data */
router.get("/", inquiry_controller.get_list);

/* DELETE all inquiry data */
router.delete("/", inquiry_controller.delete_list);

/* POST a specific user's inquiry */
router.post("/user/:user_id", inquiry_controller.create_inquiry);

/* GET a specific user's inquiries */
router.get("/user/:user_id", inquiry_controller.get_user_inquiry);

/* DELETE a specific user's inquiries */
router.delete("/user/:user_id", inquiry_controller.delete_user_inquiry);

/* GET an inquiry data */
router.get("/:id", inquiry_controller.get_detail);

/* PUT(UPDATE) an inquiry data */
router.put("/:id", inquiry_controller.update_inquiry);

/* DELETE an inquiry data */
router.delete("/:id", inquiry_controller.delete_inquiry);

/* GET the answer of a specific inquiry*/
//위 라우터로 들어갈 수 있음.  ***** 주의...!******
router.get("/:id/answer", inquiry_controller.get_answer);

/* PUT(UPDATE) new answer */
//위 라우터로 들어갈 수 있음.  ***** 주의...!******
router.put("/:id/answer", inquiry_controller.update_answer);

/* DELETE an answer data */
router.delete("/:id/answer", inquiry_controller.delete_answer);

module.exports = router;
