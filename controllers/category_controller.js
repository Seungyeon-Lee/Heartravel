// var categ_db = require('../data/db')
const pool = require("../data/pool");
const moment = require("moment");

// register new cateogry
exports.create_categ = function(req, res) {
  var categ_data = {
    index: '',
    name: req.body.categ.name,
    order: '',
    status: req.body.categ.status,
    registered : ''
  };

  var sql = "SELECT COUNT(*) AS cnt FROM category";
  //add the count of this type of product
  pool.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return result.status(500).send({
        msg: "database ERROR - while counting the last index count",
        code: "fail",
        result: err
      });
    }
    
    categ_data.index = result[0].cnt + 1;
    categ_data.order = categ_data.index;
    pool.query( "SELECT * FROM category WHERE `index`=?", [categ_data.index], function (err, result) {
      
      if (err) {
            console.log(err);
            return res.status(500).send({
              msg: "database ERROR",
              code: "fail",
              result: err
            });
          }

          //if the category id has been registered,
          if (result[0]) {
            return res.status(401).send({
              msg: "the category id is already taken. try using different id",
              code: "fail",
              result: result[0]
            });
          }

          if (!result[0]) {
            sql = "INSERT INTO category SET ?";
            categ_data.registered = moment( Date.now()).format("YYYY-MM-DD HH:mm:ss");
            pool.query(
                sql, categ_data,
                function (err, result) {
                  if (err) {
                    console.log(err);
                    return res.status(500).send({
                      msg: "database ERROR - while inserting the new categ data",
                      code: "fail",
                      result: err
                    });
                  }

                  return res.status(200).send({
                    msg: "the new category is registered successfully",
                    code: "success",
                    result: result
                  });
                }
            );
          }
        });
  });
  
};

// get and send list of all category
exports.get_list = function(req, res) {
  const sql = "SELECT * FROM category ORDER BY `order` ASC LIMIT 1000"

  pool.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no category",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "categories data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete list of all category
exports.delete_list = function(err, res) {
  const sql = "DELETE FROM category";
  pool.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "categories data has been deleted",
      code: "success",
      result: result
    });
  });
};

// send detailed data for a specific category
exports.get_detail = function(req, res) {
  const categ_data = {
    index: req.params.id
  };
  const sql = "SELECT * FROM category WHERE `index`=?";

  pool.query(sql, [categ_data.index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no such category",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "the category data has been sent",
      code: "success",
      result: result
    });
  });
};

// update the orders between categories.
// 순서대로 주면 자동으로 order 값을 계산해서 주도록
exports.update_order = function(req, res) {
  const categ_objs = req.body.categ_objs;

  const sql = "UPDATE category SET `order`=? WHERE `index`=?";
  for (var index in categ_objs) {
    var order = index * 1 + 1;
    pool.query(sql, [order, categ_objs[index].index], function(
        err,
        result
    ) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR - while dating order: " + order,
          code: "fail",
          result: err
        });
      }
    });
  }

  return res.status(200).send({
    msg: "category order is changed successfully",
    code: "success"
  });
};


// update data for a specific category
// name, order, status 수정 가능
exports.update_categ = function(req, res) {
  const categ_data = {
    index: req.params.id,
    name: req.body.categ.name,
    //order: req.body.categ.order,
    status: req.body.categ.status
  };
  const sql = "UPDATE category SET `name`=?, `status`=? WHERE `index`=?";
  //  "UPDATE category SET `name`=?, `order`=?, `status`=? WHERE `index`=?";
  pool.query(
    "SELECT * FROM category WHERE `index`=?",
    [categ_data.index],
    function(err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      if (!result[0]) {
        return res.status(401).send({
          msg: "There is no such category, can not update",
          code: "fail",
          result: result
        });
      }
      pool.query(
        sql,
        [
          categ_data.name,
        //  categ_data.order,
          categ_data.status,
          categ_data.index
        ],
        function(err, result) {
          if (err) {
            return res.status(500).send({
              msg: "database ERROR",
              code: "fail"
            });
          }

          return res.status(200).send({
            msg: "the category data has been updated",
            code: "success"
          });
        }
      );
    }
  );
};

// delete a specific category
exports.delete_categ = function(req, res) {
  const categ_data = {
    index: req.params.id
  };

  const sql = "DELETE FROM category WHERE `index`=?";

  pool.query(
    "SELECT * FROM category WHERE `index`=?",
    [categ_data.index],
    function(err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      if (!result[0]) {
        return res.status(401).send({
          msg: "There is no such category, can not delete",
          code: "fail"
        });
      }

      pool.query(sql, [categ_data.index], function(err, result) {
        if (err) {
          return res.status(500).send({
            msg: "database ERROR",
            code: "fail",
            result: err
          });
        }

        return res.status(200).send({
          msg: "the category data has been deleted successfully",
          code: "success"
        });
      });
    }
  );
};

// update status (on/ off) of a specific category
exports.update_status = function(req, res) {
  const categ_data = {
    index: req.params.id,
    status: req.body.categ
  };

  categ_data.status = (categ_data.status == false) ? 'on' : 'off';

  const sql = "UPDATE category SET status=? WHERE `index`=?";

  pool.query(
    "SELECT * FROM category WHERE `index`=?",
    [categ_data.index],
    function(err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      if (!result[0]) {
        return res.status(401).send({
          msg: "There is no such category, caannot update",
          code: "fail",
          result: result
        });
      }

      pool.query(sql, [categ_data.status, categ_data.index], function(
        err,
        result
      ) {
        if (err) {
          return res.status(500).send({
            msg: "database ERROR",
            code: "fail",
            result: err
          });
        }

        return res.status(200).send({
          msg: "the category status is changed successfully",
          code: "success"
        });
      });
    }
  );
};

