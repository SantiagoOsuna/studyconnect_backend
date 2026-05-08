import activityRepo from "../repositories/activity.repository.js";
import logger from '../config/logger.js';

class ActivityService {
  async create(data) {
    try {
      if (!data.subject_id || !data.name) {
        throw new Error('subject_id y name son requeridos');
      }
      const activity = await activityRepo.create(data);
      logger.info('Actividad creada exitosamente', { activityId: activity.id });
      return activity;
    } catch (error) {
      logger.error('Error al crear actividad:', error);
      throw error;
    }
  }

  async getBySubject(subject_id) {
    try {
      if (!subject_id) {
        throw new Error('subject_id es requerido');
      }
      const activities = await activityRepo.findBySubject(subject_id);
      return activities;
    } catch (error) {
      logger.error('Error al obtener actividades por subject:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      if (!id) {
        throw new Error('ID es requerido');
      }
      const activity = await activityRepo.update(id, data);
      if (!activity) {
        throw new Error('Actividad no encontrada');
      }
      logger.info('Actividad actualizada exitosamente', { activityId: id });
      return activity;
    } catch (error) {
      logger.error('Error al actualizar actividad:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!id) {
        throw new Error('ID es requerido');
      }
      const result = await activityRepo.delete(id);
      if (!result) {
        throw new Error('Actividad no encontrada');
      }
      logger.info('Actividad eliminada exitosamente', { activityId: id });
      return result;
    } catch (error) {
      logger.error('Error al eliminar actividad:', error);
      throw error;
    }
  }
}

export default new ActivityService();