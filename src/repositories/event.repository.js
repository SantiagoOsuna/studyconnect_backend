import db from "../config/db.js";

class EventRepository {
  async create({ user_id, title, description, due_date, status }) {
    const result = await db.query(
      `INSERT INTO events (user_id, title, description, due_date, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, title, description, due_date, status]
    );

    return result.rows[0];
  }

  async findByUser(user_id) {
    const result = await db.query(
      `SELECT * FROM events WHERE user_id = $1`,
      [user_id]
    );

    return result.rows;
  }

  async update(id, data) {
    const result = await db.query(
      `UPDATE events
       SET title=$1, description=$2, due_date=$3, status=$4
       WHERE id=$5
       RETURNING *`,
      [data.title, data.description, data.due_date, data.status, id]
    );

    return result.rows[0];
  }

  async delete(id) {
    await db.query(`DELETE FROM events WHERE id=$1`, [id]);
  }
}

export default new EventRepository();