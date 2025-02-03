const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');


router.put('/:id', authMiddleware, updateTask);
router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.get('/:id', authMiddleware, getTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;

