const db = require('../database/connect');

class Movie {
  constructor({ film_id, film_name, producer, director, notable_actors, year_released, external_rating, poster_img_url, avg_user_rating }) {
    this.film_id = film_id;
    this.film_name = film_name;
    this.producer = producer;
    this.director = director;
    this.notable_actors = notable_actors;
    this.year_released = year_released;
    this.external_rating = external_rating;
    this.poster_img_url = poster_img_url;
    this.avg_user_rating = avg_user_rating || null;
  }

  static async create(data) {
    try {
      const { film_name, producer, director, notable_actors, year_released, poster_img_url } = data;
      const response = await db.query(
        `INSERT INTO films (film_name, producer, director, notable_actors, year_released, external_rating, poster_img_url)
         VALUES ($1, $2, $3, $4, $5, 0, $6) RETURNING *;`,
        [film_name, producer, director, notable_actors, year_released, poster_img_url]
      );
      if (response.rows.length === 0) {
        throw new Error('Film could not be created.');
      }
      return new Movie(response.rows[0]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAll() {
    const response = await db.query(
      `SELECT films.*, ROUND(AVG(films_watched.root_user_rating), 1) AS avg_user_rating
       FROM films
       LEFT JOIN films_watched ON films.film_id = films_watched.film_id
       GROUP BY films.film_id
       ORDER BY films.film_id DESC;`
    );
    return response.rows.map(m => new Movie(m));
  }

  static async findById(id) {
    const response = await db.query(
      `SELECT films.*, ROUND(AVG(films_watched.root_user_rating), 1) AS avg_user_rating
       FROM films
       LEFT JOIN films_watched ON films.film_id = films_watched.film_id
       WHERE films.film_id = $1
       GROUP BY films.film_id;`,
      [id]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to locate film.');
    }
    return new Movie(response.rows[0]);
  }

  static async deleteById(id) {
    const response = await db.query(
      'DELETE FROM films WHERE film_id = $1 RETURNING *;',
      [id]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to delete film.');
    }
    return new Movie(response.rows[0]);
  }

  static async updateExternalRating(filmId, externalRating) {
    const response = await db.query(
      'UPDATE films SET external_rating = $2 WHERE film_id = $1 RETURNING *;',
      [filmId, externalRating]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to update external rating.');
    }
    return new Movie(response.rows[0]);
  }
}

module.exports = Movie;
