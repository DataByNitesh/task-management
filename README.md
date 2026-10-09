
# Task Management System

A backend Task Management System built with Node.js, Express.js, PostgreSQL, Sequelize, and JWT authentication.

The system supports user authentication, task management, ownership-based access control, and admin-only task status updates.

## Features

- User registration and login
- Password hashing with bcryptjs
- JWT-based authentication
- Role-based authorization (`user` / `admin`)
- Create tasks
- View tasks
- View a specific task
- Update own tasks
- Admin can view tasks across users
- Admin-only task status updates
- Input validation and appropriate HTTP status codes
- PostgreSQL database with Sequelize migrations and seeders
- Postman API collection for testing

## Tech Stack

- Node.js
- Express.js
- JavaScript (ES Modules)
- PostgreSQL
- Sequelize ORM
- Sequelize CLI
- JWT (`jsonwebtoken`)
- bcryptjs
- dotenv
- cors

## Project Structure


task-management-system/
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   ├── models/
│   │   ├── index.js
│   │   ├── user.model.js
│   │   └── task.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   ├── utils/
│   │   └── generateToken.js
│   └── app.js
├── migrations/
├── seeders/
├── postman/
├── .env.example
├── .gitignore
├── .sequelizerc
├── package.json
└── README.md
```

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- PostgreSQL

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Create a PostgreSQL database named:

```text
task_management
```

Create a `.env` file in the project root based on `.env.example`.

## Environment Variables

Example:

```env
PORT=5000

DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Do not commit the actual `.env` file or real secrets.

## Database Setup

Run the migrations:

```bash
npx sequelize-cli db:migrate
```

Run the seeders:

```bash
npx sequelize-cli db:seed:all
```

The seeders create one admin user and one regular user for testing.

## Running the Application

Development:

```bash
npm run dev
```

Production/start:

```bash
npm start
```

The API runs by default at:

```text
http://localhost:5000
```

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Login and receive JWT |

### Tasks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/tasks` | User/Admin | Create a task |
| GET | `/tasks` | User/Admin | Get tasks |
| GET | `/tasks/:id` | User/Admin | Get a specific task |
| PUT | `/tasks/:id` | Owner | Update own task |
| PATCH | `/tasks/:id/status` | Admin | Update task status |

### Allowed Task Statuses

```text
Pending
In Progress
Testing
Completed
```

## Authorization Rules

### Regular User

A regular user can:

- Create tasks
- View their own tasks
- View their own specific tasks
- Update their own tasks

A regular user cannot:

- Access another user's task
- Update task status

### Admin

An admin can:

- Create tasks
- View tasks across users
- View any specific task
- Update task status

Task updates through `PUT /tasks/:id` remain owner-scoped in the current implementation.

## Test Credentials

The seeders create the following accounts:

### Admin

```text
Email: admin@example.com
Password: Admin@123
Role: admin
```

### Regular User

```text
Email: user@example.com
Password: User@123
Role: user
```

These credentials are for local testing only.

## Postman Collection

The Postman collection is available at:

```text
postman/task-management-system.postman_collection.json
```

The collection includes authentication, task operations, authorization checks, and error-case testing.

## Database

The application uses PostgreSQL with Sequelize ORM.

The database contains:

- `users`
- `tasks`

Each task is associated with its creator through `tasks.user_id`.

Database schema changes are managed using Sequelize migrations, and sample users are created using Sequelize seeders.

## Error Handling

The API returns appropriate HTTP status codes for common cases, including:

- `400` — Invalid or missing input
- `401` — Authentication required or invalid credentials/token
- `403` — Insufficient permissions
- `404` — Resource not found
- `409` — Duplicate email
- `500` — Internal server error

## Assumptions

- User roles are limited to `user` and `admin`.
- Only admins can update task status.
- Regular users can only access and modify tasks they own.
- Task status values are restricted to the defined status list.
- JWTs are used for authenticated API requests.
- PostgreSQL is expected to be running locally.
