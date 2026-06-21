# MovieApp

> Developed as part of a team project at La Fosse Academy, with contributions focused on backend architecture, authentication, API integration, database design, and containerised application deployment.

MovieApp is a full-stack movie tracking platform that enables users to build personal movie collections, record ratings, view external movie information, and receive AI-powered movie recommendations.

The application combines a JavaScript frontend, Express backend, PostgreSQL database, TMDB integration, and a Python-based recommendation service to create a feature-rich movie discovery experience.

---

## Technologies

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express

### Database
- PostgreSQL

### Authentication
- JWT Authentication

### External Integrations
- TMDB API

### AI & Recommendation Engine
- Python
- Flask

### Development & Deployment
- Docker
- Docker Compose
- Git
- GitHub

---

## Key Features

- User registration and login
- JWT-based authentication and authorisation
- Personal movie collection management
- Movie rating and review functionality
- Automatic movie poster retrieval
- TMDB API integration
- AI-powered movie recommendations
- Multi-language support
- Top-rated movie homepage
- RESTful API architecture
- Docker containerisation

---

## User Journey

1. Register an account and log in.
2. Browse movie information and discover top-rated films.
3. Add movies to your personal collection.
4. Record ratings and reviews.
5. View your saved movie library.
6. Receive AI-generated movie recommendations based on your interests.

---

## Architecture

```text
Frontend
    ↓
REST API
    ↓
Express
    ↓
PostgreSQL
    ↓
TMDB API

AI Recommendation Service
    ↓
Python Flask
