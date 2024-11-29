const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const user = require("./routes/user.js");
let MyError = require("./utils/MyError.js");
let order = require("./routes/order.js")

dotenv.config();
const reacturl = process.env.REACT_URL
const dburl = process.env.ATLAS_URL;

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(cors({origin: reacturl, credentials: true}));

async function main() {
  await mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Connection error", err);
});

const port = 8080;
app.use("/", user);


app.use("/order",order);

app.get("/api",(req,res)=>{
    res.json({ message: 'API is working!' });
})

app.all("*", (req, res, next) => {
  console.log("No route middleware ")
  next(new MyError(404, "Route Not Exists"));
});

app.use((err, req, res, next) => {
  const { status = 400, message = "Something went wrong" } = err;
  console.log("Sending Json error  ")
  res.status(status).json({ message }); 
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});