module.exports = (pool) => {
  // --------------------------------------------------------------------------------
  // Default
  // --------------------------------------------------------------------------------
  const express = require("express");
  const router = express.Router();

  // --------------------------------------------------------------------------------
  // SQL Service
  // --------------------------------------------------------------------------------
  const sqlService = (sql, param) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, param, ( error, results ) => { 
          if (error) reject(error);
          else resolve(results);
      });
    });
  }

  // --------------------------------------------------------------------------------
  // Routers
  // --------------------------------------------------------------------------------
  router.post("/getInfo", async (req, res) => {
    try {
      let sql = "select title, author, description, status, keyword, like_cnt \
                 from tb_book";
      let param = req.body;
      let data = await sqlService(sql, param);
      res.send(data);
    } catch (e) {
      console.error(e);
    }
  });

  router.post("/getSeries", async (req, res) => {
    try {
      let sql = ""; // 1. 적당한 쿼리문을 입력해주세요.
      let param = req.body;
      let data = await sqlService(sql, param);
      res.send(data);
    } catch (e) {
      console.error(e);
    }
  });

  // 2. 아래에 좋아요 클릭시 작동할 기능을 추가해주세요.

  return router;
}
