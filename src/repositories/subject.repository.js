import db from '../config/db.js';

export const createSubject = (userId, name, color) => {
  return db.query(
    'INSERT INTO Subjects (user_id, name, color) VALUES ($1, $2, $3) RETURNING *',
    [userId, name, color]
  );
};

export const getSubjectsByUser = (userId) => {
  return db.query(
    'SELECT * FROM Subjects WHERE user_id = $1',
    [userId]
  );
};

export const deleteSubject = (id) => {
  return db.query(
    'DELETE FROM Subjects WHERE id = $1',
    [id]
  );
};