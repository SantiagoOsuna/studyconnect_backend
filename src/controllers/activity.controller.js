import activityService from "../services/activity.service.js";
import logger from '../config/logger.js';

export const createActivity = async (req, res) => {
  try {
    const activity = await activityService.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    logger.error('Error al crear actividad:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const { subject_id } = req.params;
    const activities = await activityService.getBySubject(subject_id);
    res.json(activities);
  } catch (error) {
    logger.error('Error al obtener actividades:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const updated = await activityService.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    logger.error('Error al actualizar actividad:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    await activityService.delete(req.params.id);
    res.json({ message: "Actividad eliminada" });
  } catch (error) {
    logger.error('Error al eliminar actividad:', error);
    const status = error.message.includes('no encontrada') ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};