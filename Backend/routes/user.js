let express = require("express");
let router = express.Router();
let WrapAsync = require("../utils/wrapAsync.js")
let userCont = require("../controller/User.js")


router.route("/signup")
    .post( WrapAsync(userCont.signup));

router.route("/login")
    .post(WrapAsync(userCont.login))

module.exports = router; 
