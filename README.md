# Quick Leaderboard Backend

A RESTful API project that implements a leaderboard backend using MongoDB for data persistence, providing endpoints to create, update, retrieve, and delete leaderboard entries efficiently.

> "I created this project as a way to study, improve my coding skills, and showcase my work in my portfolio. As my first real project, I aim to keep it simple and straightforward while focusing on learning and growth."
>
> — Gustavo Fernandes

## Description

This project implements a leaderboard system for games. It allows you to:

- Add, update, and delete scores from the database.
- Retrieve scores informations in an ordered ranking.

## Technologies

- **Node.js:** A JavaScript runtime built on Chrome's V8 engine, allowing developers to run JavaScript on the server side.
- **Express:** A minimal and flexible web application framework for Node.js, providing a robust set of features for building web and mobile applications.
- **MongoDB:** A NoSQL database that uses a document-oriented data model, ideal for storing JSON-like documents with dynamic schemas.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gustavcfer/quick-leaderboard-backend.git
   cd quick-leaderboard-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Rename the `.env.example` file to `.env` in the root directory.
   - Fill in the variables needed.

4. **Run the app:**

   - **Development mode:** This will start the server with Nodemon for auto-reloading.
     ```bash
     npm run dev
     ```

   - **Production mode:** This will start the server without Nodemon.
     ```bash
     npm start
     ```

## API Endpoints

The Quick Leaderboard Backend provides two API endpoints for interacting with the leaderboard scores. All responses are returned in JSON format, and both endpoints require authentication using a Bearer token.

### 1. `GET /api/v1/scores`

Retrieves all scores from the leaderboard.

#### Authentication

- Requires Bearer token authentication.

#### Query Parameters

- `period` (number): Specifies the number of days to look back when retrieving scores.
  - **Default**: `365` (1 year)
- `limit` (number): Limits the number of scores returned.
  - **Range**: `1` to any positive integer
  - **Default**: `500`
- `invert` (string): If set to `"true"`, sorts scores in ascending order; otherwise, sorts scores from highest to lowest.
  - **Default**: Sorted from highest to lowest

#### Example Request

```http
GET /api/v1/scores?period=30&limit=100&invert=true
Authorization: Bearer <TOKEN>
```

### 2. `PUT /api/v1/scores`

Creates a new score entry if it does not exist for a user, or updates the score if the new score is higher than the current one.

#### Authentication

- Requires Bearer token authentication.

#### Request Body

- `nickname` (string): The nickname of the player. (required if it's a new player)
- `key` (string): Unique player identifier. (required)
- `score` (number): The new score to be added or compared against the existing score. (required)
- `timestamp` (number): Timestamp with the time that the score was achieved. (optional)

#### Example Request

```http

PUT /api/v1/scores
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "user": "Player1",
  "key": "f4903uf90ef3u290eu23f90e"
  "score": 1600
}
```

## Contributions

Contributions are welcome! Please reach out to me if you would like to contribute.

## License

This project is licensed under the MIT License. See the [License](LICENSE) file for more details.