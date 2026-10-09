import { Task } from "../models/index.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      user_id: req.user.id,
      title,
      description,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const where = {};

    if (req.user.role !== "admin") {
      where.user_id = req.user.id;
    }

    const tasks = await Task.findAll({
      where,
    });

    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const where = {
      id: req.params.id,
    };

    if (req.user.role !== "admin") {
      where.user_id = req.user.id;
    }

    const task = await Task.findOne({
      where,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      task,
    });
  } catch (error) {
    console.error("Get task error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const where = {
      id: req.params.id,
    };

    if (req.user.role !== "admin") {
      where.user_id = req.user.id;
    }

    const task = await Task.findOne({ where });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (title !== undefined) {
      task.title = title;
    }

    if (description !== undefined) {
      task.description = description;
    }

    await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["Pending", "In Progress", "Testing", "Completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = status;

    await task.save();

    return res.status(200).json({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update status error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};