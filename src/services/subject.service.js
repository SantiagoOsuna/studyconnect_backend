import subjectRepo from '../repositories/subject.repository.js';
import logger from '../config/logger.js';

class SubjectService {
  async create(data) {
    try {
      if (!data.user_id || !data.name) {
        throw new Error('user_id y name son requeridos');
      }
      const subject = await subjectRepo.create(data);
      logger.info('Materia creada exitosamente', { subjectId: subject.id });
      return subject;
    } catch (error) {
      logger.error('Error al crear materia:', error);
      throw error;
    }
  }

  async getSubjectsByUser(userId) {
    try {
      if (!userId) {
        throw new Error('userId es requerido');
      }
      const subjects = await subjectRepo.getSubjectsByUser(userId);
      return subjects;
    } catch (error) {
      logger.error('Error al obtener materias por user:', error);
      throw error;
    }
  }

  async updateSubject(id, data) {
    try {
      if (!id) {
        throw new Error('ID es requerido');
      }
      const subject = await subjectRepo.updateSubject(id, data);
      if (!subject) {
        throw new Error('Materia no encontrada');
      }
      logger.info('Materia actualizada exitosamente', { subjectId: id });
      return subject;
    } catch (error) {
      logger.error('Error al actualizar materia:', error);
      throw error;
    }
  }

  async deleteSubject(id) {
    try {
      if (!id) {
        throw new Error('ID es requerido');
      }
      const result = await subjectRepo.deleteSubject(id);
      if (!result) {
        throw new Error('Materia no encontrada');
      }
      logger.info('Materia eliminada exitosamente', { subjectId: id });
      return result;
    } catch (error) {
      logger.error('Error al eliminar materia:', error);
      throw error;
    }
  }
}

export default new SubjectService();