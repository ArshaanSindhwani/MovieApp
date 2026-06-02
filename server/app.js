require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');
const ratingsRouter = require('./routes/ratings');
const externalRouter = require('./routes/external');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/movies', moviesRouter);
app.use('/movies', ratingsRouter);
app.use('/movies', externalRouter);

module.exports = app;
