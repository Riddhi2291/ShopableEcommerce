const express = require("express");
const router = express.Router();
const { authCheck } = require("../middleware/auth");

router.post("/create-or-update-user", authCheck);

module.exports = router;