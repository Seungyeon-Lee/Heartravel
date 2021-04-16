// var inq_db = require("../data/db");
const pool = require("../data/pool");
const moment = require("moment");

/**
 * 차후 수정 사항
 * 1. image upload - google cloud와 함께
 */

// get and send list of all inquiries
exports.get_list = function(req, res) {
  const sql = "SELECT * FROM inquiry";

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
        msg: "There is no inquiry",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "inquiry data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete list of all inquires
exports.delete_list = function(req, res) {
  const sql = "DELETE FROM inquiry";
  pool.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "inquries data has been deleted",
      code: "success",
      result: result
    });
  });
};

// register new inquiry by user_id
// 에러 가능성 있음.
exports.create_inquiry = function(req, res) {
  var inq_data = {
    user_id: req.params.user_id,
    title: req.body.inq.title,
    image_path: req.body.inq.image_path
  };

  var sql = "INSERT INTO inquiry SET ?";
  console.log(inq_data);
  inq_data.registered = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  pool.query(sql, inq_data, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "ERROR occur while insert new inquiry",
        code: "fail",
        result: err
      });
    }

    return res.status(201).send({
      msg: "new inquiry is registered successfully",
      code: "success"
      //result return?
    });
  });
};

// get and send detailed inquiry data for a specific user
exports.get_user_inquiry = function(req, res) {
  const inq_data = {
    user_id: req.params.user_id
  };
  const sql = "SELECT * FROM inquiry WHERE user_id=?";
  pool.query(sql, [inq_data.user_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "the user hasn't inquired yet",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "the user's inquires data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete a specific user's inquiry data
exports.delete_user_inquiry = function(req, res) {
  const inq_data = {
    user_id: req.params.user_id
  };
  const sql = "DELETE FROM inquiry WHERE user_id=?";

  pool.query(sql, [inq_data.user_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "the user's inquires data has been deleted",
      code: "success",
      result: result
    });
  });
};

//send detailed inquiry data by index (= id)
exports.get_detail = function(req, res) {
  const inq_data = {
    index: req.params.id
  };
  const sql = "SELECT * FROM inquiry WHERE inquiry.`index`=?";
  pool.query(sql, [inq_data.index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "there is no inquiry having the index ifo",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "the inquiry data has been sent",
      code: "success",
      result: result
    });
  });
};

// update data for a specific inquiry
// 답변은 여기서 수정 못함
// title, inquiry_content, image_path수정 가능
exports.update_inquiry = function(req, res) {
  const inq_data = {
    index: req.params.id,
    title: req.body.inq.title,
    inquiry_content: req.body.inq.inquiry_content,
    image_path: req.body.inq.image_path
  };

  const sql =
    "UPDATE `inquiry` SET `title`=?, `inquiry_content`=?, `image_path`=? WHERE `index`=?";

  pool.query(
    sql,
    [
      inq_data.title,
      inq_data.inquiry_content,
      inq_data.image_path,
      inq_data.index
    ],
    function(err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      return res.status(200).send({
        msg: "the inquiry data has been updated",
        code: "success",
        result: result
      });
    }
  );
};

// delete a specific inquiry data
exports.delete_inquiry = function(req, res) {
  const inq_data = {
    index: req.params.id
  };
  const sql = "DELETE FROM inquiry WHERE `index`=?";

  pool.query(sql, [inq_data.index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "the inquiry data has been deleted",
      code: "success",
      result: result
    });
  });
};

// get and send an answer of the inquiry
exports.get_answer = function(req, res) {
  const inq_data = {
    index: req.params.id
  };
  const sql = "SELECT * FROM inquiry WHERE `index`=?";
  pool.query(sql, [inq_data.index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no answer for inquiry",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "the answer data has been sent",
      code: "success",
      result: result
    });
  });
};

// register a new answer
// 오류 가능성 있음!
exports.update_answer = function(req, res) {
  var inq_data = {
    index: req.params.id,
    answer_content: req.body.inq.answer_content,
    is_answered: req.body.inq.is_answered
  };
  const sql =
    "UPDATE `inquiry` SET `answer_content`=?, `is_answered`=?, `answered`=? WHERE `index`=?";
  pool.query(
    "SELECT * FROM inquiry WHERE `index`=?",
    [inq_data.index],
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
          msg: "There is no sush inquiry",
          code: "fail",
          result: result
        });
      }

      inq_data.is_answered = 1;
      inq_data.answered = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      pool.query(
        sql,
        [
          inq_data.answer_content,
          inq_data.is_answered,
          inq_data.answered,
          inq_data.index
        ],
        function(err, result) {
          if (err) {
            return res.status(500).send({
              msg: "ERROR occur while update new answer",
              code: "fail",
              result: err
            });
          }

          return res.status(200).send({
            msg: "new answer for the inquiry has been updated",
            code: "success"
          });
        }
      );
    }
  );
};

// delete an answer
exports.delete_answer = function(req, res) {
  var inq_data = {
    index: req.params.id,
    answer_content: req.body.inq.answer_content,
    is_answered: req.body.inq.is_answered
  };
  const sql =
    "UPDATE `inquiry` SET `answer_content`=?, `is_answered`=?, `answered`=? WHERE `index`=?";
  pool.query(
    "SELECT * FROM inquiry WHERE `index`=?",
    [inq_data.index],
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
          msg: "There is no sush inquiry",
          code: "fail",
          result: result
        });
      }

      inq_data.is_answered = 0;
      inq_data.answered = null;
      inq_data.answer_content = null;
      pool.query(
        sql,
        [
          inq_data.answer_content,
          inq_data.is_answered,
          inq_data.answered,
          inq_data.index
        ],
        function(err, result) {
          if (err) {
            return res.status(500).send({
              msg: "ERROR occur while update new answer",
              code: "fail",
              result: err
            });
          }

          return res.status(200).send({
            msg: "new answer for the inquiry has been updated",
            code: "success"
          });
        }
      );
    }
  );
};
