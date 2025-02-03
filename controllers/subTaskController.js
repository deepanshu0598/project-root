const SubTask = require('../models/subTask');

const createSubTask = async (req, res) => {
    const { taskId, title } = req.body;
    try {
        const subTask = new SubTask({
        taskId,
        title,
        });
        await subTask.save();
        res.status(201).json(subTask);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getSubTasks = async (req, res) => {
    const { taskId } = req.params;
    try {
        const subTasks = await SubTask.find({ taskId });
        res.status(200).json(subTasks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const updateSubTask = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const subTask = await SubTask.findByIdAndUpdate(id, { title }, { new: true });
        res.status(200).json(subTask);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const updateSubTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!["Pending", "Completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }
    try {
        const subTask = await SubTask.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json(subTask);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const deleteSubTask = async (req, res) => {
    const { id } = req.params;
    try {
        await SubTask.findByIdAndDelete(id);
        res.status(200).json({ message: "Subtask deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createSubTask,
    getSubTasks,
    updateSubTask,
    updateSubTaskStatus,
    deleteSubTask
};