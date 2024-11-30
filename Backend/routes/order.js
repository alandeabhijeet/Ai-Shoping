let express = require("express");
let router = express.Router();
let WrapAsync = require("../utils/wrapAsync.js");
const { authenticateToken } = require("../utils/middleware.js");
const { seeOrder, review } = require("../controller/order.js");

router.route("/")
    .get(authenticateToken , WrapAsync(seeOrder))

router.route("/review")
    .post(authenticateToken ,WrapAsync(review) )

module.exports = router