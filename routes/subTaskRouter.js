const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createSubTask,
  getSubTasks,
  updateSubTask,
  updateSubTaskStatus,
  deleteSubTask
} = require('../controllers/subTaskController');

router.post('/', authMiddleware, createSubTask);
router.get('/:taskId', authMiddleware, getSubTasks);
router.put('/:id', authMiddleware, updateSubTask);
router.put('/:id/status', authMiddleware, updateSubTaskStatus);
router.delete('/:id', authMiddleware, deleteSubTask);

module.exports = router;
