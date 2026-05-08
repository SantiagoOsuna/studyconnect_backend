import eventRepo from "../repositories/event.repository.js";
import logger from '../config/logger.js';

class EventService {
  async create(data) {
    try {
      if (!data.user_id || !data.title) {
        throw new Error('user_id y title son requeridos');
      }
      const event = await eventRepo.create(data);
      logger.info('Evento creado exitosamente', { eventId: event.id });
      return event;
    } catch (error) {
      logger.error('Error al crear evento:', error);
      throw error;
    }
  }

  async getByUser(user_id) {
    try {
      if (!user_id) {
        throw new Error('user_id es requerido');
      }
      const events = await eventRepo.findByUser(user_id);
      return events;
    } catch (error) {
      logger.error('Error al obtener eventos por user:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      if (!id) {
        throw new Error('ID es requerido');
      }
      const event = await eventRepo.update(id, data);
      if (!event) {
        throw new Error('Evento no encontrado');
      }
      logger.info('Evento actualizado exitosamente', { eventId: id });
      return event;
    } catch (error) {
      logger.error('Error al actualizar evento:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!id) {
        throw new Error('ID es requerido');
      }
      const result = await eventRepo.delete(id);
      if (!result) {
        throw new Error('Evento no encontrado');
      }
      logger.info('Evento eliminado exitosamente', { eventId: id });
      return result;
    } catch (error) {
      logger.error('Error al eliminar evento:', error);
      throw error;
    }
  }
}

export default new EventService();