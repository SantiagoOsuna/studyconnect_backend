import eventRepo from "../repositories/event.repository.js";

class EventService {
  create(data) {
    return eventRepo.create(data);
  }

  getByUser(user_id) {
    return eventRepo.findByUser(user_id);
  }

  update(id, data) {
    return eventRepo.update(id, data);
  }

  delete(id) {
    return eventRepo.delete(id);
  }
}

export default new EventService();