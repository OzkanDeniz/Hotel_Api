"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /
//!
/*------------------------------------------- */
router.use("/auth", require("./auth"));
router.use("/token", require("./token"));
// user:
router.use("/user", require("./user"));
// room:
router.use("/room", require("./room"));

// reservation:
router.use("/reservation", require("./reservation"));

/* ------------------------------------------------------- */
module.exports = router;
