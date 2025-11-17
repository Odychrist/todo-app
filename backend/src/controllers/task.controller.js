import Tasks from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
  const author = req.user.userId;
  try {
    const tasks = await Tasks.find({ author }).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getAllTasks controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getOpenTasks = async (req, res) => {
  const author = req.user.userId;
  try {
    const openTasks = await Tasks.find({ author, complete: false }).sort({
      createdAt: -1,
    });
    return res.status(200).json(openTasks);
  } catch (error) {
    console.error("Error in getOpenTasks controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getCompleteTasks = async (req, res) => {
  const author = req.user.userId;
  try {
    const completeTasks = await Tasks.find({ author, complete: true }).sort({
      createdAt: -1,
    });
    return res.status(200).json(completeTasks);
  } catch (error) {
    console.error("Error in getCompleteTasks controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    return res.status(200).json(task);
  } catch (error) {
    console.error("Error in getTaskById controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const author = req.user.userId;
    const task = new Tasks({ title, description, author });
    const savedTask = await task.save();
    return res
      .status(201)
      .json({ success: true, message: "Task created successfully" });
  } catch (error) {
    console.error("Error in createTask controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, complete } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const author = req.user.userId;
    const updatedTask = await Tasks.findByIdAndUpdate(
      req.params.id,
      { title, description, complete, author },
      { new: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    console.error("Error in updateTask controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
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
    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTask controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
