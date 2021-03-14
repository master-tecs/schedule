// const {Movie, validate} = require('../models/movie');
// import mongoose from "mongoose";
import express from "express";
import auth from "../middleware/auth.js";
import { User } from "../models/user.js";
import { Todo, validateMovie as validate } from "../models/todo.js";

const router = express.Router();
export default router;

// @route   GET api/posts/posted/:id
// @desc    Get posts by ID
// @access  Public
// router.get("/:userId", async (req, res) => {
//   const userId = req.params.userId;

//   const todos = await Todo.find({ userId: userId }).sort({ startDate: -1 });
//   res.json(todos);
//   console.log("TODOS", todos);

// const todos = await Todo.find().exec( ( error, posts ) => {
//     posts.map( ( p ) => {
//             let userPosted = currentUser.posts.some((userPost) => {
//                 return userPost.equals(p._id)
//             });
//             return Object.assign(p.toObject(), {userPost: userPosted});
//     } );
// } );

//   Todo.find({ user: req.user._id })
//     .sort({ startDate: -1 })
//     .then((todos) => res.json(todos))
//     .catch((err) =>
//       res.status(404).json({ notodofound: "No todo found with that ID" })
//     );
// });

router.get("/", auth, async (req, res) => {
  const userId = req.user._id;
  const todos = await Todo.find({ userId: userId }).sort({
    completed: -1,
    startDate: -1,
  });
  res.send(todos);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userId = req.user._id;

  const todo = new Todo({
    title: req.body.title,
    detail: req.body.detail,
    userId: userId,
  });
  await todo.save();

  res.send(todo);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      detail: req.body.detail,
      userId: user._id,
      // userId: {
      //   _id: user._id,
      //   name: user.name,
      //   username: user.username,
      //   email: user.username,
      //   profile: user.profile,
      // },
      completed: req.body.completed,
      pinned: req.body.pinned,
    },
    { new: true }
  );

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.params.id);

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});
