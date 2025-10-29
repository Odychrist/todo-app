import Tasks from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getAllTasks controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getOpenTasks = async (req, res) => {
  try {
    const openTasks = await Tasks.find({ complete: false }).sort({
      createdAt: -1,
    });
    res.status(200).json(openTasks);
  } catch (error) {
    console.error("Error in getOpenTasks controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getCompleteTasks = async (req, res) => {
  try {
    const completeTasks = await Tasks.find({ complete: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(completeTasks);
  } catch (error) {
    console.error("Error in getCompleteTasks controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    console.error("Error in getTaskById controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Tasks({ title, description });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error in createTask controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, complete } = req.body;
    const updatedTask = await Tasks.findByIdAndUpdate(
      req.params.id,
      { title, description, complete },
      { new: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error in updateTask controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Tasks.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTask controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
