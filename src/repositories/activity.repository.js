import db from "../config/db.js";

class ActivityRepository {
  async create({ subject_id, title, description, due_date, status }) {
    const result = await db.query(
      `INSERT INTO activities (subject_id, title, description, due_date, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [subject_id, title, description, due_date, status]
    );

    return result.rows[0];
  }

  async findBySubject(subject_id) {
    const result = await db.query(
      `SELECT * FROM activities WHERE subject_id = $1`,
      [subject_id]
    );

    return result.rows;
  }

  async update(id, data) {
    const result = await db.query(
      `UPDATE activities
       SET title=$1, description=$2, due_date=$3, status=$4
       WHERE id=$5
       RETURNING *`,
      [data.title, data.description, data.due_date, data.status, id]
    );

    return result.rows[0];
  }

  async delete(id) {
    await db.query(`DELETE FROM activities WHERE id=$1`, [id]);
  }
}

export default new ActivityRepository();