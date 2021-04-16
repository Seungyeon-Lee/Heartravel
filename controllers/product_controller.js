// var prod_db = require("../data/db");
const pool = require("../data/pool");
const moment = require("moment");
const productMiddleware = require("../middleware/products");

// register new product
exports.create_prod = function(req, res) {
  const prod_data = {
    // prod_id: 자동생성,
    prod_name: req.body.prod.prod_name,
    price: req.body.prod.price,
    image_path: req.body.prod.image_path,
    type_index: req.body.prod.type_index,
    status_index: req.body.prod.status_index,
    detail: req.body.prod.detail
  };

  const categ_objs = req.body.prod.categ_objs;

  var prod_id = "";
  var date = moment(Date.now()).format("YYYY-MM");
  date = date.split("-");
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
      pool.query(sql, [prod_data.type_index], function(err, result) {
        if (err) {
          console.log(err);
          return result.status(500).send({
            msg: "database ERROR - while getting type count",
            code: "fail",
            result: err
          });
        } else {
          prod_id += "0" + prod_data.type_index;
          prod_id += result[0].cnt + 1;
          prod_data.prod_id = prod_id;

          //insert into category_n_product
          sql = "INSERT INTO product SET ?";
          pool.query(
            "SELECT * FROM product WHERE prod_id=?",
            [prod_data.prod_id],
            function(err, result) {
              if (err) {
                console.log(err);
                return res.status(500).send({
                  msg: "database ERROR",
                  code: "fail",
                  result: err
                });
              }
              //the product id is available
              if (!result[0]) {
                prod_data.registered = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
                pool.query(sql, prod_data, function(err, result) {
                  if (err) {
                    return res.status(500).send({
                      msg: "ERROR occur while insert new product",
                      code: "fail",
                      result: err
                    });
                  } else {
                    for (let index in categ_objs) {
                      pool.query(
                        "INSERT INTO product_and_category SET ?",
                        [{prod_id : prod_id, categ_index : categ_objs[index]}],
                        function(err, result) {
                          if (err) {
                            return res.status(500).send({
                              msg:
                                "database ERROR - while adding category and product data",
                              code: "fail",
                              result: err
                            });
                          }
                        }
                      );
                    }
                    return res.status(201).send({
                      msg: "new product is registered successfully",
                      code: "success"
                    });
                  }
                });
              }
            }
          );
        }
      });
    }
  });
};

// get and send list of all products
exports.get_list = function(req, res) {
  const sql = "SELECT * FROM product";

  pool.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no product",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "product data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete list of all products
exports.delete_list = function(req, res) {
  const sql = "DELETE FROM product";
  pool.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "all product data has been deleted all",
      code: "success"
    });
  });
};

// send detailed data for a specific user
exports.get_detail = function(req, res) {
  const prod_data = {
    prod_id: req.params.id
  };
  const sql = "SELECT p.*, pc.categ_index " +
      "FROM product p LEFT JOIN product_and_category pc " +
      "ON p.prod_id = pc.prod_id  WHERE p.prod_id=?";

  pool.query(sql, [prod_data.prod_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no such product",
        code: "fail"
      });
    }

    return res.status(200).send({
      msg: "the product data has been sent",
      code: "success",
      result: result
    });
  });
};

// update data for a specific product
// prod_name, price, image_path, type, status 수정 가능
exports.update_product = function(req, res) {
  var prod_data = {
    prod_id: req.params.id,
    prod_name: req.body.prod.prod_name,
    price: req.body.prod.price,
    detail : req.body.prod.detail,
    image_path: req.body.prod.image_path,
    type_index: req.body.prod.type_index,
    status_index: req.body.prod.status_index,
    categ_objs: req.body.prod.categ_objs,
  };

  let sql =
      "UPDATE `product` SET `prod_name`=?, `price`=?, `image_path`=?, `detail`=?, `type_index`=?, `status_index`=? WHERE `prod_id`=?";

  pool.query(
      sql,
      [
        prod_data.prod_name,
        prod_data.price,
        prod_data.image_path,
        prod_data.detail,
        prod_data.type_index,
        prod_data.status_index,
        prod_data.prod_id
      ],
      function (err, result) {
        if (err) {
          return res.status(500).send({
            msg: "database ERROR",
            code: "fail",
            result: err
          });
        } else {
          sql = "DELETE FROM product_and_category WHERE prod_id=?";

          pool.query(sql, [prod_data.prod_id], function (err, result) {
            console.log(result);
            if (err) {
              return res.status(500).send({
                msg: "database ERROR",
                code: "fail",
                result: err
              });
            }
            for (let index in prod_data.categ_objs) {
              pool.query(
                  "INSERT INTO product_and_category SET ?",
                  [{prod_id: prod_data.prod_id, categ_index: prod_data.categ_objs[index]}],
                  function (err, result) {
                    if (err) {
                      return res.status(500).send({
                        msg:
                            "database ERROR - while adding category and product data",
                        code: "fail",
                        result: err
                      });
                    }
                  });
            }
            return res.status(200).send({
              msg: "product data has been sent",
              code: "success",
              result: result
            });
          });
        }
      });
};
// delete a specific product
exports.delete_product = function(req, res) {
  const prod_data = {
    prod_id: req.params.id
  };
  let sql = "DELETE FROM product WHERE prod_id=?";

  pool.query(sql, [prod_data.prod_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    sql = "DELETE FROM product_and_category WHERE prod_id=?";

    pool.query(sql, [prod_data.prod_id], function (err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      return res.status(200).send({
        msg: "the product data has been deleted",
        code: "success",
        result: result
      });
    });
  });
};

// get and send list of all products matching with the category
// 에러 가능성 있음.
exports.get_list_categ = function(req, res) {
  // join product and product_and_category
  const prod_data = {
    categ_index: req.params.idx
  };
  //수정 필 + category.name 추가
  const sql =
    "SELECT p.prod_id, p.prod_id AND pc.categ_index " +
    "FROM product AS p " +
    "JOIN product_and_category AS pc " +
    "ON p.prod_id = pc.prod_id AND pc.categ_index = ?";
  pool.query(sql, [prod_data.categ_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no product haing the category info",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "product data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete all products matching with the category
// product와 product_and_category 에서 둘다 삭제
// 에러 가능성 있음.
exports.delete_list_categ = function(req, res) {
  // join product and product_and_category
  const prod_data = {
    categ_index: req.params.idx
  };

  const sql =
    "DELETE p, pc " +
    "FROM product p INNER JOIN product_and_category pc " +
    "WHERE p.prod_id = pc.prod_id " +
    "AND pc.categ_index=?";

  pool.query(sql, [prod_data.categ_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "product data and category data has been deleted",
      code: "success",
      result: result
    });
  });
};

// get and send list of all products matching with the type
exports.get_list_type = function(req, res) {
  const prod_data = {
    type_index: req.params.idx
  };
  const sql = "SELECT * FROM product WHERE type_index=?";
  pool.query(sql, [prod_data.type_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.stauts(401).send({
        msg: "there is no product having the type info",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "products data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete all products matching with the type
exports.delete_list_type = function(req, res) {
  const prod_data = {
    type_index: req.params.idx
  };
  const sql = "DELETE FROM product WHERE type_index=?";
  pool.query(sql, [prod_data.type_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "the product data has been deleted",
      code: "success",
      result: result
    });
  });
};

// get and send list of all products matching with the status
exports.get_list_status = function(req, res) {
  const prod_data = {
    status_index: req.params.idx
  };
  const sql = "SELECT * FROM product WHERE status_index=?";
  pool.query(sql, [prod_data.status_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.stauts(401).send({
        msg: "there is no product having the status info",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "products data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete all products matching with the status
exports.delete_list_status = function(req, res) {
  const prod_data = {
    status_index: req.params.idx
  };
  const sql = "DELETE from product WHERE status_index=?";

  pool.query(sql, [prod_data.status_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "product data has been deleted",
      code: "success",
      result: result
    });
  });
};
