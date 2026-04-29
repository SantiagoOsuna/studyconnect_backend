import activityRepo from "../repositories/activity.repository.js";

class ActivityService {
  create(data) {
    return activityRepo.create(data);
  }

  getBySubject(subject_id) {
    return activityRepo.findBySubject(subject_id);
  }

  update(id, data) {
    return activityRepo.update(id, data);
  }

  delete(id) {
    return activityRepo.delete(id);
  }
}

export default new ActivityService();