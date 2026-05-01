const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createProject,
  getProjects,
  addMember,
  removeMember,
} = require('../controllers/projectController');

const router = express.Router();

router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getProjects);
router.post('/add-member', authMiddleware, addMember);
router.post('/remove-member', authMiddleware, removeMember);

module.exports = router;