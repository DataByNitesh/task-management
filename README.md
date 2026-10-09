# Task Management System

A backend Task Management System built with Node.js, Express.js, PostgreSQL, Sequelize, and JWT authentication.

The application provides user authentication, task management, ownership-based access control, and admin-level task management.

## Features

- User registration and login
- Password hashing with bcryptjs
- JWT-based authentication
- Role-based authorization (`user` and `admin`)
- Create and view tasks
- View individual tasks
- Users can update their own tasks
- Admins can view and update tasks across users
- Admin-only task status updates
- Input validation and appropriate HTTP status codes
- PostgreSQL database with Sequelize migrations and seeders
- Postman collection for API testing

## Tech Stack

- Node.js
- Express.js
- JavaScript (ES Modules)
- PostgreSQL
- Sequelize ORM
- Sequelize CLI
- JSON Web Tokens (`jsonwebtoken`)
- bcryptjs
- dotenv
- cors

## Project Structure

```text
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
│   │   ├── task.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   ├── utils/
│   │   └── generateToken.js
│   └── app.js
├── migrations/
├── seeders/
├── postman/
│   └── task-management-system.postman_collection.json
├── .env.example
├── .gitignore
├── .sequelizerc
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

Install the following before running the application:

- Node.js
- npm
- PostgreSQL

## Installation

Clone the repository:

```bash
git clone https://github.com/DataByNitesh/task-management.git
cd task-management
```

Install dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the project root using `.env.example` as a template.

Example configuration:

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

Replace the example database credentials and JWT secret with your own local values.

**Security note:** Never commit your actual `.env` file or real secrets to GitHub.

## Database Setup

Ensure PostgreSQL is running and create a database named `task_management`.

Run the migrations to create the required tables:

```bash
npx sequelize-cli db:migrate
```

Run the seeders to create sample users:

```bash
npx sequelize-cli db:seed:all
```

The seeders create one admin account and one regular-user account for local testing.

## Running the Application

Start the development server:

```bash
npm run dev
```

Alternatively, start the application using:

```bash
npm start
```

The API runs at:

```text
http://localhost:5000
```

You can verify that the server is running by visiting the root endpoint:

```http
GET /
```

## API Endpoints

### Authentication

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/auth/register` | Not required | Register a new user |
| POST | `/auth/login` | Not required | Login and receive a JWT |

### Tasks

All task endpoints require a valid JWT unless otherwise specified.

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/tasks` | User/Admin | Create a task |
| GET | `/tasks` | User/Admin | Get accessible tasks |
| GET | `/tasks/:id` | User/Admin | Get a specific task |
| PUT | `/tasks/:id` | Owner/Admin | Update a task's title or description |
| PATCH | `/tasks/:id/status` | Admin only | Update a task's status |

### Allowed Task Statuses

Task status must be one of the following values:

- `Pending`
- `In Progress`
- `Testing`
- `Completed`

## Authorization Rules

### Regular User

A regular user can:

- Create tasks
- View their own tasks
- View an individual task they own
- Update the title and description of their own tasks

A regular user cannot:

- View another user's tasks
- Modify another user's tasks
- Update task status

### Admin

An admin can:

- Create tasks
- View tasks across users
- View any individual task
- Update the title and description of any user's task
- Update the status of any task

Access control is enforced by the API using JWT authentication and role-based authorization.

## Test Credentials

The database seeders create the following sample accounts.

### Admin Account

```text
Email: admin@example.com
Password: Admin@123
Role: admin
```

### Regular User Account

```text
Email: user@example.com
Password: User@123
Role: user
```

These credentials are intended for local testing only.

## Postman API Testing

The Postman collection is available at:

```text
postman/task-management-system.postman_collection.json
```

Import the collection into Postman to test the API.

The collection includes requests for:

- User registration and login
- Task creation and retrieval
- Task updates and status changes
- User ownership restrictions
- Admin authorization
- Missing and invalid authentication tokens
- Invalid input and error responses

The collection uses `http://localhost:5000` as the default API base URL.

## Database Schema

The application uses PostgreSQL with Sequelize ORM.

### Users

The `users` table stores user details, including:

- ID
- Name
- Email
- Hashed password
- Role
- Creation and update timestamps

### Tasks

The `tasks` table stores:

- ID
- User ID
- Title
- Description
- Status
- Creation and update timestamps

Each task is associated with its creator through `tasks.user_id`.

Database schema changes are managed using Sequelize migrations, and sample user accounts are created using seeders.

## Error Handling

The API uses appropriate HTTP status codes for common scenarios:

| Status Code | Meaning |
|---|---|
| `200` | Request completed successfully |
| `201` | Resource created successfully |
| `400` | Invalid or missing input |
| `401` | Authentication required or invalid credentials/token |
| `403` | Insufficient permissions |
| `404` | Resource not found or inaccessible |
| `409` | Duplicate email |
| `500` | Internal server error |

## Assumptions

- User roles are limited to `user` and `admin`.
- New registrations receive the regular-user role by default.
- Only admins can update task status.
- Regular users can access and modify only their own tasks.
- Admins can view and edit tasks across users.
- Task status values are restricted to the defined list.
- JWTs are required for protected API requests.
- PostgreSQL must be running and configured before starting the application.

## AI Usage

AI assistance was used during development to help with implementation, troubleshooting, and documentation. The code and API behavior were reviewed and tested during development.
