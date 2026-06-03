const db = require("../database/connect");

class Rating {
  constructor({
    films_watched_id,
    film_id,
    user_id,
    root_user_rating,
    username,
    film_name,
    poster_img_url,
  }) {
    this.films_watched_id = films_watched_id;
    this.film_id = film_id;
    this.user_id = user_id;
    this.root_user_rating = root_user_rating;
    this.username = username || null;
    this.film_name = film_name || null;
    this.poster_img_url = poster_img_url || null;
  }

  static async create(userId, filmId, rating) {
    const response = await db.query(
      `INSERT INTO films_watched (user_id, film_id, root_user_rating)
       VALUES ($1, $2, $3)
       RETURNING *;`,
      [userId, filmId, rating],
    );

    if (!response.rows[0]) throw new Error('Rating could not be created.');
    return new Rating(response.rows[0]);
  }

  static async updateRating(userId, filmId, rating) {
    const response = await db.query(
      `UPDATE films_watched
       SET root_user_rating = $3
       WHERE user_id = $1 AND film_id = $2
       RETURNING *;`,
      [userId, filmId, rating],
    );

    if (response.rows.length === 0) return null;
    return new Rating(response.rows[0]);
  }

  static async findByFilm(filmId) {
    const response = await db.query(
      `SELECT films_watched.*, users.username
       FROM films_watched
       JOIN users ON films_watched.user_id = users.user_id
       WHERE films_watched.film_id = $1
       ORDER BY films_watched.films_watched_id DESC;`,
      [filmId],
    );

    return response.rows.map((rating) => new Rating(rating));
  }

  static async findByUser(userId) {
    const response = await db.query(
      `SELECT films_watched.*, films.film_name, films.poster_img_url
       FROM films_watched
       JOIN films ON films_watched.film_id = films.film_id
       WHERE films_watched.user_id = $1
       ORDER BY films_watched.films_watched_id DESC;`,
      [userId],
    );

    return response.rows.map((rating) => new Rating(rating));
  }
}

module.exports = Rating;
