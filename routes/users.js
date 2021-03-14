// const {Movie, validate} = require('../models/movie');
import _ from "lodash";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import express from "express";
import { User, validateUser as validate } from "../models/user.js";

const router = express.Router();
export default router;

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select([
    "name",
    "username",
    "email",
    "profile",
    "bio",
    "isGold",
    "phone",
  ]);
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = await User.findOne({ username: req.body.username });
  if (user)
    return res.status(400).send("Username already used. Try another one.");

  user = new User(_.pick(req.body, ["name", "email", "username", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "username"]));
});

// router.put("/:id", auth, async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//       username: req.body.username,
//       phone: req.body.phone,
//       password: req.body.password,
//       bio: req.body.bio,
//       profile: req.body.profile,
//     },
//     { new: true }
//   );

//   if (!user)
//     return res.status(404).send("The user with the given ID was not found.");

//   res.send(user);
// });

// router.delete("/:id", [auth, admin], async (req, res) => {
//   const user = await User.findByIdAndRemove(req.params.id);

//   if (!user)
//     return res.status(404).send("The user with the given ID was not found.");

//   res.send(user);
// });

// router.get("/:id", async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user)
//     return res.status(404).send("The user with the given ID was not found.");

//   res.send(user);
// });
