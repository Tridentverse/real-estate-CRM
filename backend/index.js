const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
const path = require("path")

app.use(express.json());



const cron = require("node-cron");
const status = require("express-status-monitor")

const AdminRoute = require("./Routes/AdminRoute");
const UserRoute = require("./Routes/UserRoute");
const PropertyRoute = require("./Routes/PropertyRoute");
const wishlistRoutes = require('./Routes/WishlistRoute');




// Connect to the database
connectDB();
const server = http.createServer(app);
const allowedOrigins = [
"http://localhost:3000", 
"https://propertyapplication-frontend.property.app", 
];
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming request's origin is in the allowed origins
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));



app.use("/api", AdminRoute);
app.use("/api", UserRoute);
app.use("/api", PropertyRoute);
app.use('/api', wishlistRoutes);


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });