const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './config/app.env' });
}

// Import database connection
const { connect } = require('./config/database');

// Import middlewares and routes
const errorhandle = require('./middleware/error');
const {
  CreateUser, UpdateUser, LoginUser, LogoutUser, AdminUpdateuser, GetAllUSer,
} = require('./routes/userroutes');

const {
  CreateProduct, GetAllProduct, AddReview, UpdateProduct,
  GetProduct, DeleteReview, GetAllReview, DeleteProduct,
  AdminGetAllProducts, GetTopSellProducts,
} = require('./routes/productroutes');

const {
  CreateOrder, UpdateOrder, DeleteOrder,
  MyOrders, Getorder, GetAllOrders,
} = require('./routes/orderroutes');

const {
  ProcessPayment, PublishKey, PaymentVerification, GenerateIvoice,
} = require('./routes/paymentroute');

const app = express();

// ✅ Proper CORS setup
app.use(cors({
  origin: "https://flipkart-clone-ten-beige.vercel.app", // your frontend domain
  credentials: true,
}));

// ✅ Middleware
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: 100 * 1024 * 1024 } }));

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// ✅ Register Routes

// 1. User routes
app.use(CreateUser);
app.use(UpdateUser);
app.use(LoginUser);
app.use(LogoutUser);
app.use(AdminUpdateuser);
app.use(GetAllUSer);

// 2. Product routes
app.use(CreateProduct);
app.use(GetAllProduct);
app.use(AddReview);
app.use(UpdateProduct);
app.use(GetProduct);
app.use(DeleteReview);
app.use(GetAllReview);
app.use(DeleteProduct);
app.use(AdminGetAllProducts);
app.use(GetTopSellProducts);

// 3. Order routes
app.use(CreateOrder);
app.use(UpdateOrder);
app.use(DeleteOrder);
app.use(MyOrders);
app.use(Getorder);
app.use(GetAllOrders);

// 4. Payment routes
app.use(ProcessPayment);
app.use(PaymentVerification);
app.use(PublishKey);
app.use(GenerateIvoice);

// Health check route
app.get('/', (req, res) => {
  console.log("Server is running");
  res.send("Hi, from backend");
});

// Error handler
app.use(errorhandle);

// ✅ Connect to DB and Start Server
const Port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connect(); // Wait for MongoDB
    app.listen(Port, () => {
      console.log(`🚀 Server running on port ${Port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
