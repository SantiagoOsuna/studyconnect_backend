import subjectService from '../services/subject.service.js';
import logger from '../config/logger.js';

export const createSubject = async (req, res) => {
  try {
    const subject = await subjectService.create({
      user_id: req.user.id,
      ...req.body
    });

    res.status(201).json(subject);
  } catch (error) {
    logger.error('Error al crear materia:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getSubjectsByUser(req.user.id);
    res.json(subjects);
  } catch (error) {
    logger.error('Error al obtener materias:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateSubjects = async (req, res) => {
  try {
    const updated = await subjectService.updateSubject(
      req.params.id,
      req.body
    );

    res.json(updated);
  } catch (error) {
    logger.error('Error al actualizar materia:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    await subjectService.deleteSubject(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    logger.error('Error al eliminar materia:', error);
    const status = error.message.includes('no encontrada') ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};