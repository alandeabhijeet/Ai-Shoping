let express = require("express");
let router = express.Router();
let WrapAsync = require("../utils/wrapAsync.js");
const { authenticateToken } = require("../utils/middleware.js");
const { seeOrder } = require("../controller/order.js");

router.route("/")
    .get(authenticateToken , WrapAsync(seeOrder))

module.exports = router