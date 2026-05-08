import eventService from "../services/event.service.js";
import logger from '../config/logger.js';

export const createEvent = async (req, res) => {
  try {
    const event = await eventService.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    logger.error('Error al crear evento:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const user_id = req.user.id;
    const events = await eventService.getByUser(user_id);
    res.json(events);
  } catch (error) {
    logger.error('Error al obtener eventos:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updated = await eventService.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    logger.error('Error al actualizar evento:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await eventService.delete(req.params.id);
    res.json({ message: "Evento eliminado" });
  } catch (error) {
    logger.error('Error al eliminar evento:', error);
    res.status(500).json({ message: error.message });
  }
};