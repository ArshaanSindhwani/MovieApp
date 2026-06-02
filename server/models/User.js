const db = require("../database/connect");

class User {
  constructor({ user_id, username, password }) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
  }

  static async create(username, hashedPassword) {
    const response = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;",
      [username, hashedPassword],
    );

    if (!response.rows[0]) throw new Error('User could not be created.');
    return new User(response.rows[0]);
  }

  static async findByUsername(username) {
    const response = await db.query(
      "SELECT * FROM users WHERE username = $1;",
      [username],
    );

    if (response.rows.length === 0) return null;
    return new User(response.rows[0]);
  }

  static async findById(id) {
    const response = await db.query(
      "SELECT * FROM users WHERE user_id = $1;",
      [id],
    );

    if (response.rows.length === 0) return null;
    return new User(response.rows[0]);
  }

  static async getAll() {
    const response = await db.query(
      "SELECT user_id, username FROM users ORDER BY user_id ASC;",
    );

    return response.rows.map((user) => new User(user));
  }

  static async deleteById(id) {
    const response = await db.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *;",
      [id],
    );

    if (response.rows.length === 0) return null;
    return new User(response.rows[0]);
  }
}

module.exports = User;
