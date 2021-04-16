// const deliv_db = require("../data/db");
const pool = require("../data/pool");
module.exports = {
  /* check delivery status */
  deliveryStatusChk: (req, res, next) => {
    //배송지 정보 변경 하기 전에 체크함.
    const delivery_id = req.params.id;

    const sql = "SELECT status_index FROM delivery WHERE delivery_id=?";
    pool.query(sql, delivery_id,function(err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      if (!result[0]) {
        return res.status(401).send({
          msg: "There is no such delivery",
          code: "fail"
        });
      }
      // 만약 결제 완료 전이 아니면
      if (result[0].status_index !== 1) {
        return res.status(400).send({
          msg: "cannot change delivery info",
          code: "fail"
        });
      }
    });

    next();
  }
};
