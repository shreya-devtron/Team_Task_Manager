const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middlewares/authMiddleware");

/* CREATE TASK */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user.id,
    });

    await task.save();

    res.json({
      success: true,
      task,
    });
  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* GET TASKS (ONLY USER TASKS) */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("GET TASK ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* UPDATE TASK */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error("UPDATE TASK ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* DELETE TASK */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE TASK ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;