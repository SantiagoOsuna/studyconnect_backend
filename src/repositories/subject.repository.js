import db from '../config/db.js';

class SubjectRepository {
  async create({ user_id, name, color }) {
    const result = await db.query(
      'INSERT INTO Subjects (user_id, name, color) VALUES ($1, $2, $3) RETURNING *',
      [user_id, name, color]
    );
    return result.rows[0];
  }

  async getSubjectsByUser(user_id) {
    const result = await db.query(
      'SELECT * FROM Subjects WHERE user_id = $1',
      [user_id]
    );
    return result.rows;
  }

  async updateSubject(id, { name, color }) {
    const result = await db.query(
      'UPDATE Subjects SET name = $1, color = $2 WHERE id = $3 RETURNING *',
      [name, color, id]
    );
    return result.rows[0];
  }

  async deleteSubject(id) {
    const result = await db.query(
      'DELETE FROM Subjects WHERE id = $1',
      [id]
    );
    return result.rowCount;
  }
}

export default new SubjectRepository();
