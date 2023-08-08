const express = require('express');
var expressLayouts = require("express-ejs-layouts");
const flash = require('express-flash');
const session = require('express-session');
const { default: mongoose } = require('mongoose');
const AllRoutes = require('./router/index');

const app = express();
mongoose.connect(
  "mongodb+srv://ali:12345@cluster0.v8vmkjb.mongodb.net/"
).then(()=>{
    console.log("Connected to DB");
});

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(flash());

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layout/main.ejs");

//set up session
app.use(session({
    secret:"secret key",
    resave:false,
    saveUninitialized:false
}));

app.use(AllRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`);
})