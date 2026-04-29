import eventService from "../services/event.service.js";

export const createEvent = async (req, res) => {
  try {
    const event = await eventService.create(req.body);
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const user_id = req.user.id;
    const events = await eventService.getByUser(user_id);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updated = await eventService.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await eventService.delete(req.params.id);
    res.json({ message: "Evento eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};