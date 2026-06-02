DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS films;
DROP TABLE IF EXISTS films_watched;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE films (
    film_id INT GENERATED ALWAYS AS IDENTITY,
    film_name VARCHAR(300) NOT NULL,
    producer VARCHAR(100) NOT NULL,
    director VARCHAR(100) NOT NULL,
    notable_actors VARCHAR(200) NOT NULL,
    year_released DATE NOT NULL,
    external_rating INT NOT NULL,
    poster_img_url VARCHAR(100) NOT NULL,
    PRIMARY KEY (film_id)
);

INSERT INTO films (
    film_name,
    producer,
    director,
    notable_actors,
    year_released,
    external_rating,
    poster_img_url
)
VALUES
    (
        'The Rocky Horror Picture Show',
        'Lou Adler, Michael White',
        'Jim Sharman',
        'Tim Curry, Susan Sarandon, Barry Bostwick',
        '1975-01-01',
        '0',
        ''
    ),
    (
        'Blade Runner',
        'Michael Deeley',
        'Ridley Scott',
        'Harrison Ford, Rutger Hauer, Sean Young',
        '1982-01-01',
        '0',
        ''
    ),
    (
        'Donnie Darko',
        'Adam Fields, Sean McKittrick',
        'Richard Kelly',
        'Jake Gyllenhaal, Jena Malone, Patrick Swayze',
        '2001-01-01',
        '0',
        ''    
    ),
    (
        'Fight Club',
        'Art Linson, Ross Grayson Bell',
        'David Fincher',
        'Brad Pitt, Edward Norton, Helena Bonham Carter',
        '1999-01-01',
        '0',
        ''
    ),
    (
        'The Big Lebowski',
        'Ethan Coen',
        'Joel Coen',
        'Jeff Bridges, John Goodman, Julianne Moore',
        '1998-01-01',
        '0',
        ''
    );

CREATE TABLE films_watched (
    films_watched_id INT GENERATED ALWAYS AS IDENTITY,
    film_id INT NOT NULL,
    user_id INT NOT NULL,
    root_user_rating INT NOT NULL,
    PRIMARY KEY (films_watched_id),
    FOREIGN KEY (film_id) REFERENCES films(film_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)