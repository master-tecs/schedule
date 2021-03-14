import Joi from "joi";
import mongoose from "mongoose";

export const Todo = mongoose.model(
  "Todos",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 0,
      maxlength: 255,
    },
    detail: {
      type: String,
      required: true,
      trim: true,
      minlength: 0,
      maxlength: 255,
    },
    userId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    pinned: {
      type: Boolean,
      required: true,
      default: false,
    },
  })
);

export function validateMovie(todo) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    detail: Joi.string().min(3).max(255).required(),
    userId: Joi.string().min(0).required(),
    completed: Joi.boolean(),
    endDate: Joi.date(),
    pinned: Joi.boolean(),
  });

  return schema.validate(todo);
  // return Joi.assert(todo, schema);
}
