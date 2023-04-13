import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userController = {
  register: async (req, res) => {
    try {
      let { email, password, firstName, lastName } = req.body;
      let user = await Users.findOne({ email });
      if (user) res.status(400).json({ message: "The email is realdy exists" });
      if (passwordValidates(password) != 1)
        return res.status(400).json({ message: passwordValidates(password) });
      let hashPassword = bcrypt.hashSync(password, 10);
      password = hashPassword;
      let newUser = new Users({
        email,
        password,
        firstName,
        lastName,
      });
      await newUser.save();
      const accessToken = createAccessToken({ id: newUser._id });
      const refeshToken = refeshAccessToken({ id: newUser._id });
      res.cookie("refeshtoken", refeshToken, {
        httpOnly: true,
        path: "user/refesh_token",
      });

      return res.status(200).json({ accessToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    console.log(req);
    res.header("Access-Control-Allow-Origin");
    try {
      let { email, password } = req.body;
      let user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ message: "User is not exists" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ message: "user or password is not correct" });
      const accessToken = createAccessToken({ id: user._id });
      const refeshToken = refeshAccessToken({ id: user._id });
      res.cookie("refeshtoken", refeshToken, {
        httpOnly: true,
        path: "user/refesh_token",
      });
      return res.json({ accessToken, role: user.role });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refeshtoken", { path: "user/refesh_token" });
      return res.status(200).json({ message: "logged out" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      let user = await Users.findById(req.user.id).select("-password");
      if (!user) res.status(400).json({ message: "user is not exist" });
      res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      let users = await Users.find({}).select("-password");
      res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  refeshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refeshtoken;
      if (!rf_token)
        return res.status(400).json({ message: "Please Login or Register" });
      jwt.verify(rf_token, process.env.REFESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ message: "Please Login ro Register" });
        const accessToken = createAccessToken({ id: user.id });
        return res.json({ accessToken });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    res.json({ rf_token });
  },
};
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const refeshAccessToken = (user) => {
  return jwt.sign(user, process.env.REFESH_TOKEN_SECRET, { expiresIn: "7d" });
};
let passwordValidates = (password) => {
  if (password.length <= 8) return "Password must be more than 8 characters!";
  if (password.length >= 32)
    return "Password must be  less than 32 characters!";
  if (!password.match(/[a-z]/) || !password.match(/[A-Z]/))
    return "Password must be have both lowcase and uppercase letters!";
  if (!password.match(/[0-9]/))
    return "Password must be have at least 1 number!";
  return 1;
};
export default userController;
