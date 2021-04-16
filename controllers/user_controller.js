// var user_db = require("../data/db");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userMiddleware = require("../middleware/users.js");
const pool = require("../data/pool");

// initialize users DB
userMiddleware.initUserDB();

// get and send list of all users
exports.get_list = function(req, res) {
  const sql = "SELECT * FROM user";

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
        msg: "There is no user",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "users data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete list of all users
exports.delete_list = function(req, res) {
  const sql = "DELETE FROM user";
  pool.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(200).send({
      msg: "users data has been deleted",
      code: "success"
    });
  });
};

// send detailed data for a specific user
exports.get_detail = function(req, res) {
  const req_data = {
    user_id: req.params.id
  };
  const sql = "SELECT * FROM user WHERE user_id=?";

  pool.query(sql, [req_data.user_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no such user",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "the user data has been sent",
      code: "success",
      result: result
    });
  });
};

// update data for a specific user
exports.update_user = function(req, res) {
  const res_data = {
    user_id: req.params.id,
    user_name: req.body.user.user_name,
    email: req.body.user.email,
    phone: req.body.user.phone,
    postcode: req.body.user.postcode,
    address: req.body.user.address,
    address_detail: req.body.user.address_detail,
    status_index: req.body.user.status_index,
    role_index: req.body.user.role_index
  };
  const sql =
    "UPDATE `user` SET `user_name`=?, `email`=?, `phone`=?, `postcode`=?, `address`=?, `address_detail`=?, `status_index`=?, `role_index`=? WHERE `user_id`=?";

  pool.query(
    sql,
    [
      res_data.user_name,
      res_data.email,
      res_data.phone,
      res_data.postcode,
      res_data.address,
      res_data.address_detail,
      res_data.status_index,
      res_data.role_index,
      res_data.user_id
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
        msg: "the user data has been updated",
        code: "success",
        result: result
      });
    }
  );
};

// delete a specific user
exports.delete_user = function(req, res) {
  const req_data = {
    user_id: req.params.id
  };
  const sql = "DELETE FROM user WHERE user_id=?";

  pool.query(sql, [req_data.user_id], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "the user data has been deleted",
      code: "success"
    });
  });
};

// update user password
exports.update_newpw = function(req, res) {
  var res_data = {
    user_id: req.params.id,
    new_password: req.body.user.password
  };
  const sql = "UPDATE user SET password=? WHERE user_id=?";

  //user_id에 해당되는 user 있는지 확인
  pool.query("SELECT * FROM user WHERE user_id=?", [res_data.user_id], function(
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
    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no such user",
        code: "fail",
        result: result
      });
    }
  });

  //비밀번호 암호화 후 저장
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return res.status(500).send({
        msg: "cannot encrypt the new password",
        code: "fail",
        result: err
      });
    }

    bcrypt.hash(res_data.new_password, salt, function(err, hash) {
      if (err) {
        return res.status(500).send({
          msg: "cannot encrypt the new password",
          code: "fail",
          result: err
        });
      } else {
        res_data.new_password = hash;
        pool.query(sql, [res_data.new_password, res_data.user_id], function(
          err,
          result
        ) {
          if (err) {
            return res.status(500).send({
              msg: "database ERROR - cannot update new password!",
              code: "fail",
              result: err
            });
          }

          return res.status(200).send({
            msg: "the user password has been updated",
            code: "success",
            result: result
          });
        });
      }
    });
  });
};

// get and send list of all users matching status
exports.get_list_status = function(req, res) {
  const req_data = {
    status_index: req.params.idx
  };
  const sql = "SELECT * FROM `user` WHERE `status_index`=?";
  pool.query(sql, [req_data.status_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no such user having the status info",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "users data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete all users matching status
exports.delete_list_status = function(req, res) {
  const req_data = {
    status_index: req.params.idx
  };
  const sql = "DELETE from user WHERE status_index=?";

  pool.query(sql, [req_data.status_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "users data has been deleted",
      code: "success"
    });
  });
};

// get and send list of all users matching role
exports.get_list_role = function(req, res) {
  const req_data = {
    role_index: req.params.idx
  };
  const sql = "SELECT * FROM `user` WHERE `role_index`=?";
  pool.query(sql, [req_data.role_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    if (!result[0]) {
      return res.status(401).send({
        msg: "There is no such user having the role info",
        code: "fail",
        result: result
      });
    }

    return res.status(200).send({
      msg: "users data has been sent",
      code: "success",
      result: result
    });
  });
};

// delete of all users matching role
exports.delete_list_role = function(req, res) {
  const req_data = {
    role_index: req.params.idx
  };
  const sql = "DELETE from user WHERE role_index=?";

  pool.query(sql, [req_data.role_index], function(err, result) {
    if (err) {
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    return res.status(204).send({
      msg: "users data has been deleted",
      code: "success"
    });
  });
};

// create user login token
exports.create_login = function(req, res) {
  const req_data = {
    user_id: req.body.user_id,
    password: req.body.password
  };

  console.log(req_data);
  pool.query("SELECT * FROM user WHERE user_id=?", [req_data.user_id], function(
    err,
    result
  ) {
    console.log(result[0]);
    // user is not exists
    if (err) {
      console.log(err);
      return res.status(500).send({
        msg: "database ERROR",
        code: "fail",
        result: err
      });
    }

    // id is not exist
    if (!result[0]) {
      return res.status(401).send({
        msg: "the user id is not exist",
        code: "fail",
        result: result
      });
    }

    // id is exist
    // check password
    bcrypt.compare(req_data.password, result[0].password, function(
      bErr,
      bResult
    ) {
      console.log(bResult);

      if (bErr) {
        return res.status(500).send({
          msg: "ERROR occurs while decoding the password",
          code: "fail",
          result: bErr
        });
      }

      //wrong password
      if (!bResult) {
        return res.send({
          msg: "the password is wrong",
          code: "fail",
          result: bResult
        });
      }
      // right password
      if (bResult) {
        //make token
        const token = jwt.sign(
          {
            index: result[0].index,
            user_id: result[0].user_id
          },
          "BOOKTRAVEL",
          {
            expiresIn: "7d"
          }
        );
        // console.log(token);

        //update token to DB
        var logined = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        pool.query("UPDATE user SET logined=? WHERE user_id=?", [
          logined,
          result[0].user_id
        ]);

        //result로 통일 해야함.
        return res.status(201).send({
          msg: "Logged in!",
          code: "success",
          token,
          user: result[0]
          //   user: result[0]
        });
      }

      // others
      return res.status(401).send({
        msg: "Username or password is incorrect",
        code: "fail",
        result: result
      });
    });
  });
};

// create new user
exports.create_newuser = function(req, res) {
  var res_data = {
    user_id: req.body.user.user_id,
    password: req.body.user.password,
    user_name: req.body.user.user_name,
    postcode: req.body.user.postcode,
    address: req.body.user.address,
    address_detail: req.body.user.address_detail,
    phone: req.body.user.phone,
    email: req.body.user.email
  };

  // username is available
  // hashing password
  //1.getSalt, 2.hash
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(res_data.password, salt, function(err, hash) {
      if (err) {
        return res.status(500).send({
          msg: err,
          code: "fail"
        });
      } else {
        res_data.password = hash;
        res_data.registered = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        // has hashed pw => add to database
        pool.query("INSERT INTO user SET ?", res_data, function(err, result) {
          if (err) {
            return res.status(500).send({
              msg: "database ERROR - cannot create new user",
              code: "fail",
              result: err
            });
          }

          return res.status(201).send({
            msg: "new user has been created",
            code: "success",
            result: result
          });
        });
      }
    });
  });
};

// get an id info to find id & send mail
exports.get_id_info = function(req, res) {
  const req_data = {
    user_name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  };

  //여기에 토큰 받는 코드가 있었음!
  pool.query(
    "SELECT * FROM user WHERE user_name=? AND phone=? AND email=?",
    [req_data.user_name, req_data.phone, req_data.email],
    function(err, result) {
      if (err) {
        return res.status(500).send({
          msg: "database ERROR",
          code: "fail",
          result: err
        });
      }

      //there is no user info
      if (!result[0]) {
        return res.status(401).send({
          msg: "cannot find the user info",
          code: "fail",
          result: result
        });
      }

      //there is user info
      var user_id = result[0].user_id;
      var subject = "SHOPPING MALL - 아이디 찾기 메일입니다.";
      var html =
        "<p> 요청하신 고객님의 아이디 입니다. </p>" +
        "<p> </p>" +
        "<b>" +
        user_id +
        "</b>" +
        "</br>";
      userMiddleware.sendMail(req_data.email, subject, html);

      return res.status(202).send({
        msg: "the id info has been sent to email",
        code: "success",
        result: result
      });
    }
  );
};

// get a password info to find password & send mail
exports.get_pw_info = function(req, res) {
  const req_data = {
    user_id: req.body.user.user_id,
    phone: req.body.user.phone,
    email: req.body.user.email
  };

  pool.query(
    "SELECT user_id FROM user WHERE user_id=? AND phone=? AND email=?",
    [req_data.user_id, req_data.phone, req_data.email],
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
          msg: "cannot find the user info",
          code: "fail",
          result: result
        });
      }

      var code = userMiddleware.createCode();
      var subject = "SHOPPING MALL - 비밀번호 찾기 메일입니다. (인증번호)";
      var html =
        "<p>요청하신 인증번호로, 30분 동안 유효합니다. </p>" +
        "<p> </p>" +
        "<b>" +
        code +
        "</b>" +
        "</br>";
      userMiddleware.sendMail(req_data.email, subject, html);

      // update verificodes table
      var verifi_info = {
        user_id: req_data.user_id,
        code: code,
        created: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      };
      pool.query(
        "SELECT user_id FROM verification_code WHERE user_id=?",
        [result[0].user_id],
        function(vErr, vResult) {
          if (vErr) {
            return res.status(500).send({
              msg: "database ERROR - accessing to verification_code",
              code: "fail",
              result: vErr
            });
          }
          if (!vResult[0]) {
            //the user requested code first time
            pool.query("INSERT INTO verification_code SET ?", [verifi_info]);
          }

          //the user reqeusted code more than once
          pool.query(
            "UPDATE verification_code SET code=?, created=? WHERE user_id=?",
            [verifi_info.code, verifi_info.created, verifi_info.user_id]
          );
        }
      );

      return res.status(202).send({
        msg: "the verification code has been sent to email",
        code: "success"
      });
    }
  );
};

// exports.get_certificode = function(req, res) {

// }
