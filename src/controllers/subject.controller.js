import subjectService from '../services/subject.service.js';

// CREATE
export const createSubject = async (req, res) => {
  try {
    const subject = await subjectService.create({
      user_id: req.user.id,
      ...req.body
    });

    res.json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET
export const getSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getSubjectsByUser(req.user.id);
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateSubjects = async (req, res) => {
  try {
    const updated = await subjectService.updateSubject(
      req.params.id,
      req.body
    );

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
export const deleteSubject = async (req, res) => {
  try {
    await subjectService.deleteSubject(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};