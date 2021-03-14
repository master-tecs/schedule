import Joi from "@hapi/joi";
import config from "config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  //   repeat_password: {
  //     type: String,
  //     required: true,
  //     minlength: 8,
  //     maxlength: 255,
  //   },
  profile: {
    type: String,
    default: "profile.jpg",
    minlength: 0,
    maxlength: 255,
  },
  bio: {
    type: String,
    default: "",
    minlength: 0,
    maxlength: 255,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      username: this.username,
      profile: this.profile,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

export const User = mongoose.model("User", userSchema);

export function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    username: Joi.string().alphanum().min(5).max(255).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(5)
      .max(255)
      .required(),
    // bio: Joi.string().min(0).max(255),
    // profile: Joi.string().min(0).max(255),
    password: Joi.string()
      .min(8)
      .max(255)
      //   .pattern(new RegExp("^[a-zA-Z0-9]{3,50}$"))
      .required(),
    // repeat_password: Joi.ref("password"),
    // phone: Joi.number().min(5).max(255),
  });

  return schema.validate(user);
  //   return Joi.assert(user, schema);
}
