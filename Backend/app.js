require('dotenv').config();

// Creating an express app or instance
const express = require('express');
const app = express();



// Cross Origin Setup
const cors = require('cors');
// app.use(cors());





  



// DB Connections
const ConnectDB = require('./controller/mongoose.js');
ConnectDB();


// Parsing Cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser());
//Parsing the data
app.use('*',express.json());
app.use('*',express.urlencoded({ extended: true }));


// Requriing All Routes
const homeRoute = require('./routes/home.js');
const User = require('./routes/User.js');
const Cart = require('./routes/Cart.js');
const AdminProduct = require('./routes/Admin.js');
const Products = require('./routes/Products.js');
const Payment  = require('./routes/Payment.js');
const Order = require('./routes/Order.js');
// All Middlewears
app.use('*', cors({
    credentials:true,
    origin: ['http://localhost:5173' , "https://fanshoe.vercel.app"],
   
  })); //{origin:'Frontend Url', credentials: true}



app.use('/', homeRoute);
app.use('/', User);
app.use('/', Cart);
app.use('/', AdminProduct);
app.use('/', Products);
app.use('/', Payment);
app.use('/', Order);
app.get('/end', (req, res) => {
    process.exit(0);
})

app.listen(process.env.PORT, (req, res) => {
    console.log("Listenning on PORT:" + process.env.PORT);
})
