import activityService from "../services/activity.service.js";

export const createActivity = async (req, res) => {
  try {
    const activity = await activityService.create(req.body);
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const { subject_id } = req.params;
    const activities = await activityService.getBySubject(subject_id);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const updated = await activityService.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    await activityService.delete(req.params.id);
    res.json({ message: "Actividad eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};