import * as subjectService from '../services/subject.service.js';

export const createSubject = async (req, res) => {
  try {
    const subject = await subjectService.createSubjectService(
      req.user.id,
      req.body
    );

    res.json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getSubjectsService(req.user.id);
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    await subjectService.deleteSubjectService(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};