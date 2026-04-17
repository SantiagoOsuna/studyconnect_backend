import { Router } from 'express';
import {
  createSubject,
  getSubjects,
  deleteSubject
} from '../controllers/subject.controller.js';

import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', verifyToken, createSubject);
router.get('/', verifyToken, getSubjects);
router.delete('/:id', verifyToken, deleteSubject);

export default router;