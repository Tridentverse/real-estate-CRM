const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
   
    username: {
      type: String,
       },
    email: {
      type: String,
     },
    password: {
      type: String,
     },
     review: {
      type: String,
     },
    })

// Export the schema
module.exports = mongoose.model("user", UserSchema);
