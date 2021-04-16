// const pay_db = require("../data/db");
const pool = require("../data/pool");
module.exports = {
  /* check delivery status */
  IdValidChk: (req, res, next) => {
    const payment_id = req.params.id;

    const sql = "SELECT payment_id FROM payment WHERE payment_id = ?";
    pool.query(sql, [payment_id], function(err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      if (!result[0]) {
        return res.status(401).send({
          msg: "There is no such payment data",
          code: "fail"
        });
      } else next();
    });
  }
};
