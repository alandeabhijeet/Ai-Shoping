let express = require("express");
let router = express.Router();
let WrapAsync = require("../utils/wrapAsync.js");
const { authenticateToken, admin } = require("../utils/middleware.js");
const { add, list } = require("../controller/product.js");
const multer  = require('multer')
let {storage}= require("../utils/cloudConfig.js");
const upload = multer({storage })

router.route("/")
    .post(authenticateToken , admin , (req, res, next) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                console.error("Multer Error:", err);
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    }, WrapAsync(add))

router.route("/list")
    .get(authenticateToken , admin , WrapAsync(list))
module.exports = router