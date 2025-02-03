const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
      index: true,
    },
    subTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubTask" }],
  },
  { timestamps: true }
);

TaskSchema.index({ userId: 1 });
TaskSchema.index({ status: 1 });
module.exports = mongoose.model("Task", TaskSchema);
