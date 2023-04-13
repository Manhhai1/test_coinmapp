import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  role: {
    type: Number,
    default: 0,
  },
});
const Users = mongoose.model("Users", userSchema);
export default Users;
