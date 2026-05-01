const Project = require('../models/Project');
const User = require('../models/User');

// Create project
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const admin = req.user.id;

    const project = new Project({
      name,
      description,
      admin,
      members: [admin],
    });

    await project.save();
    await project.populate('admin', 'name email');
    await project.populate('members', 'name email');

    res.status(201).json({ message: 'Project created', project });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.find({
      $or: [{ admin: userId }, { members: userId }],
    }).populate('admin', 'name email').populate('members', 'name email');

    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// Add member to project
exports.addMember = async (req, res) => {
  try {
    const { projectId, memberId } = req.body;
    const adminId = req.user.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.admin.toString() !== adminId) {
      return res.status(403).json({ message: 'Only admin can add members' });
    }

    if (!project.members.includes(memberId)) {
      project.members.push(memberId);
      await project.save();
    }

    await project.populate('members', 'name email');
    res.json({ message: 'Member added', project });
  } catch (error) {
    res.status(500).json({ message: 'Error adding member', error: error.message });
  }
};

// Remove member from project
exports.removeMember = async (req, res) => {
  try {
    const { projectId, memberId } = req.body;
    const adminId = req.user.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.admin.toString() !== adminId) {
      return res.status(403).json({ message: 'Only admin can remove members' });
    }

    project.members = project.members.filter(id => id.toString() !== memberId);
    await project.save();

    await project.populate('members', 'name email');
    res.json({ message: 'Member removed', project });
  } catch (error) {
    res.status(500).json({ message: 'Error removing member', error: error.message });
  }
};