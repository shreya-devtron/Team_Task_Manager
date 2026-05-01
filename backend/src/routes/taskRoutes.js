const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createTask,
  getTasksByProject,
  updateTask,
  getDashboard,
} = require('../controllers/taskController');

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/project/:projectId', authMiddleware, getTasksByProject);
router.put('/:taskId', authMiddleware, updateTask);
router.get('/dashboard/stats', authMiddleware, getDashboard);

module.exports = router;