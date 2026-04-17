import * as subjectRepo from '../repositories/subject.repository.js';

export const createSubjectService = async (userId, data) => {
  const { name, color } = data;

  if (!name) throw new Error('El nombre es obligatorio');

  const result = await subjectRepo.createSubject(userId, name, color);
  return result.rows[0];
};

export const getSubjectsService = async (userId) => {
  const result = await subjectRepo.getSubjectsByUser(userId);
  return result.rows;
};

export const deleteSubjectService = async (id) => {
  await subjectRepo.deleteSubject(id);
};