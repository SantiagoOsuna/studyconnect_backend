import db from '../config/db.js';

class UserRepository {

  async create(name, email, password) {
    const result = await db.query(
      'INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password]
    );
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await db.query(
      'SELECT * FROM Users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  async findUserById(id) {
    const result = await db.query(
      'SELECT id, name, email, created_at FROM Users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  async getAllUsers() {
    const result = await db.query(
      'SELECT id, name, email, created_at FROM Users'
    );
    return result.rows;
  }

  async updateUser(id, name, email) {
    const result = await db.query(
      'UPDATE Users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at',
      [name, email, id]
    );
    return result.rows[0];
  }

  async deleteUser(id) {
    await db.query(
      'DELETE FROM Users WHERE id = $1',
      [id]
    );
  }
}

export default new UserRepository();