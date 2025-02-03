const mongoose = require("mongoose");

const SubTaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

SubTaskSchema.index({ taskId: 1 });
module.exports = mongoose.model("SubTask", SubTaskSchema);
