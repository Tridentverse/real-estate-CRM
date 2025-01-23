const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Promocode = require("../Models/User");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // Find the last user and determine the next userId
    const lastUser = await User.findOne().sort({ userId: -1 }); // Sort by userId in descending order
    const userId = lastUser ? lastUser.userId + 1 : 1; // Default to userId 1 if no users are found

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      userId,
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const { id } = req.params;
    // Find user by ID
    const user = await User.findById(id); // Exclude the password field
    if (!user) {
      return res.status(404).json({success: false, message: "User not found" });
    }
    res.status(200).json({success: true,
     userprofileData:{ username: user.username,
      email: user.email,
      highScore: user.highScore,
      coins: user.coins,
      achievements: user.achievements,
    }});
  } catch (error) {
    res.status(500).json({ success: false,error: error.message });
  }
};

const updateprofile = async(req,res ) => {
  try {
    const { id } = req.params;
    const { username, email, avatar } = req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false,message: "User not found" });
    }
    Object.keys(req.body).forEach((key) => {
      if (user[key] !== undefined) { // Check if the field exists in the user object
        user[key] = req.body[key];
      }
    });
   await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        highScore: user.highScore,
        coins: user.coins,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false,error: error.message });
  }
}

const login = async (req, res) => {
  try {
    // Extracting the required data from request body
    const { email, username, password } = req.body;

    // Check if either email or username is provided, and password is mandatory
    if ((!email && !username) || !password) {
      return res.status(400).json({
        success: false,
        message: "Either email or username and password are required.",
      });
    }

    // Determine query to use for searching: email OR username
    let query = {};

    // Ensure correct query construction based on what the user sends
    if (email) {
      query = { email: { $regex: email, $options: 'i' } }; // Case-insensitive match on email
    } else if (username) {
      query = { username: { $regex: username, $options: 'i' } }; // Case-insensitive match on username
    }

    console.log("Constructed Query:", query);  // Log the query for debugging

    // Find user based on the query (email or username)
    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare the passwords provided with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // If everything is good, generate a JWT for the session
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the user
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User account deleted successfully",
      user: {
        username: user.username,
        email: user.email,
        userId: user.userId,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllusers = async (req, res) => {
  try{
    const pageSize = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const search = req.query.search;

    const query = {
        deleted_at: null,
    };
    if (search) {
        query.username = { $regex: search, $options: "i" };
        
    }

    const result = await User.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    const count = await User.find(query).countDocuments();
    res.status(200).json({ success: true, result, count });

}catch(error){
    res.status(500).json({success:false,message:"error inserting bet"});
 }
};
module.exports = {
  register,
  login,
  profile,
  updateprofile,
  deleteUser,
  getAllusers
};
