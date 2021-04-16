// var db = require("../data/db.js");
var moment = require("moment");
const pool = require("../data/pool");

module.exports = {
  /**
   * make product Id
   */
  createProductId: (type_index, next) => {
    var prod_id = "";
    var date = moment(Date.now()).format("YYYY-MM");
    date = date.split("-");
    // add year and month
    prod_id += date[0].slice(2, 4) + date[1];

    //get index and add index
    var sql = "SELECT MAX(`index`) AS max FROM product";
    pool.query(sql, function(err, result) {
      if (err) {
        console.log(err);
        return result.status(500).send({
          msg: "database ERROR - while getting max index",
          code: "fail",
          result: err
        });
      } else {
        var product_idx = result[0].max + 1;
        var length = 2;
        product_idx = product_idx + ""; // number를 문자열로 변환하는 작업
        var str = "";
        for (var i = 0; i < length - product_idx.length; i++) str = str + "0";
        str = str + product_idx;

        prod_id += str + "-";

        sql = "SELECT COUNT(*) AS cnt FROM product WHERE type_index=?";
        //add the count of this type of product
        pool.query(sql, [type_index], function(err, result) {
          if (err) {
            console.log(err);
            return result.status(500).send({
              msg: "database ERROR - while getting type count",
              code: "fail",
              result: err
            });
          }
          prod_id += "0" + type_index;
          prod_id += result[0].cnt + 1;
          console.log(prod_id);
          return prod_id;
        });
      }
    });
    return prod_id;
  }
};
