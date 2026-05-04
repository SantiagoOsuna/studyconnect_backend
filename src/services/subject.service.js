import subjectRepo from '../repositories/subject.repository.js';

class SubjectService {
  create(data) {
    return subjectRepo.create(data);
  }

  getSubjectsByUser(userId) {
    return subjectRepo.getSubjectsByUser(userId);
  }

  updateSubject(id, data) {
    return subjectRepo.updateSubject(id, data);
  }

  deleteSubject(id) {
    return subjectRepo.deleteSubject(id);
  }
}

export default new SubjectService();