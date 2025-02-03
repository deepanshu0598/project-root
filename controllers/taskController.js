const Task = require("../models/Task");
const Joi = require("joi");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user });
    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createTask = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must not exceed 100 characters",
      "any.required": "Title is required",
    }),
    description: Joi.string().allow("", null).max(500).messages({
      "string.max": "Description must not exceed 500 characters",
    }),
    dueDate: Joi.date().greater(new Date()).required().messages({
      "date.greater": "Due date must be in the future",
      "any.required": "Due date is required",
    }),
    priority: Joi.string().valid("Low", "Medium", "High").default("Medium"),
    status: Joi.string().valid("Pending", "Completed").default("Pending"),
    subTasks: Joi.array()
      .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
      .messages({ "string.pattern.base": "Invalid subTask ID format" }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((detail) => detail.message) });
  }

  try {
    const task = new Task({
      ...req.body,
      userId: req.user,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateTask = async (req, res) => {
  console.log(req.params.id);
  
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).messages({
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must not exceed 100 characters",
    }),
    description: Joi.string().allow("", null).max(500).messages({
      "string.max": "Description must not exceed 500 characters",
    }),
    dueDate: Joi.date().greater(new Date()).messages({
      "date.greater": "Due date must be in the future",
    }),
    priority: Joi.string().valid("Low", "Medium", "High"),
    status: Joi.string().valid("Pending", "Completed"),
    subTasks: Joi.array()
      .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
      .messages({ "string.pattern.base": "Invalid subTask ID format" }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400)
      .json({ errors: error.details.map((detail) => detail.message) });
  }

  try {    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id},
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
};
