# MovieApp

> Full-stack movie tracking application developed as part of a team project at La Fosse Academy.

MovieApp allows users to register, log in, search for films, add movies to their personal list, rate watched films, and view movie information supported by external API data.

The project demonstrates full-stack development, REST API design, relational database modelling, authentication, Docker containerisation, external API integration, and AI-assisted recommendation functionality.

## Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- TMDB API
- Python
- Docker
- Docker Compose
- Git
- GitHub

## Key Features

- User registration and login
- JWT-based protected routes
- Personal movie list functionality
- Add, view, rate, and manage watched films
- External movie data integration using TMDB
- AI-powered recommendation functionality
- PostgreSQL database with relational models
- RESTful API structure with controllers, routes, models, and middleware
- Dockerised backend and database setup

## Architecture

```text
MovieApp
├── Frontend Client
│   ├── Authentication pages
│   ├── Homepage
│   ├── Add movie form
│   └── Personal movie list
│
├── Express REST API
│   ├── Authentication
│   ├── Movie management
│   ├── Rating management
│   ├── User management
│   └── External API integration
│
├── PostgreSQL Database
│   ├── Users
│   ├── Films
│   └── Ratings
│
└── External Services
    ├── TMDB API
    └── Python AI recommendation service
```

## My Contribution

I contributed to the backend and full-stack integration of MovieApp, focusing on authentication, database connectivity, API structure, external movie data, and local development setup.

My main contributions included:

- Built and maintained Express routes, controllers, and models
- Implemented JWT-based authentication for protected user functionality
- Connected backend functionality to a PostgreSQL relational database
- Supported movie and rating API endpoints
- Integrated external movie data through the TMDB API
- Worked with Docker and Docker Compose for local development
- Helped debug frontend, backend, database, and API integration issues
- Collaborated using Git branches, pull requests, and team-based version control

## Screenshots

Screenshots will be added soon.

```text
screenshots
├── homepage.png
├── login.png
├── register.png
├── add-movie.png
└── my-list.png
```

## What I Learned

This project helped me strengthen my understanding of full-stack application development and how different parts of an application connect together.

Key learning points included:

- Structuring a full-stack application with separate frontend and backend folders
- Building RESTful API endpoints using Express
- Protecting user-specific functionality with JWT authentication
- Modelling relational data using PostgreSQL
- Connecting backend services to external APIs
- Using Docker to support consistent local development
- Debugging issues across frontend, backend, database, and third-party integrations
- Working collaboratively using Git, feature branches, and pull requests

## Future Improvements

Potential future improvements include:

- Add a more polished and responsive user interface
- Improve AI-generated movie recommendations
- Add user profile pages
- Add social features for sharing movie lists
- Add stronger backend testing coverage
- Deploy the full application using a cloud platform
- Add screenshots and a live demo link
