"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();

//routes/auth:

const auth = require("../controllers/auth");

//URL: /auths

router.post("/login",auth.login)

router.post("/logout",auth.logout)
  

module.exports = router;
