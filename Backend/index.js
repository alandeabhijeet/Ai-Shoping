const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const user = require("./routes/user.js");
const app = express();
let MyError = require("./utils/MyError.js")

app.use(express.json()); // To parse JSON payloads
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded payloads
app.use(cookieParser());
const reacturl = process.env.REACT_URL
app.use(cors({origin: reacturl, credentials: true}));
const dburl = process.env.ATLAS_URL;

main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Connection error", err);
});

async function main() {
  await mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}


const port = 8080;
app.use("/", user);
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