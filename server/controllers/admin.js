const User = require("../models/User");
const Movie = require("../models/Movie");

async function listUsers(req, res) {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.deleteById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function adminDeleteMovie(req, res) {
  try {
    const movie = await Movie.deleteById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Film not found" });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listUsers, deleteUser, adminDeleteMovie };
