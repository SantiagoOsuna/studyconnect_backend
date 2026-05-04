import { Router } from 'express';
import {
  createSubject,
  getSubjects,
  updateSubjects,
  deleteSubject
} from '../controllers/subject.controller.js';

import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', verifyToken, createSubject);
router.get('/', verifyToken, getSubjects);
router.put('/:id', verifyToken, updateSubjects);
router.delete('/:id', verifyToken, deleteSubject);

export default router;