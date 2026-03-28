# Task Manager API

🌐 **Live Demo:** [https://icn-test-phi.vercel.app/](https://icn-api.vercel.app/)

A simple Task Management API built with Express.js, TypeScript, Prisma ORM, and PostgreSQL. This API provides features for user authentication, task management with user relationships, and complete CRUD operations.

## 📋 Tech Stack

- **Backend**: Node.js + Express.js + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Token)
- **Validation**: class-validator
- **Password Hashing**: bcrypt
- **Environment Management**: dotenv

## ✨ Features

### User Management
- User registration with email and password
- User login with JWT token generation
- Get all users
- Get user profile with their tasks
- Update user information (name, email)
- Delete user account

### Task Management
- Create tasks for logged-in users
- Get all tasks (public)
- Get tasks specific to current user (requires auth)
- Get tasks by specific user ID (public)
- Get individual task details
- Update task (title, description, completion status)
- Delete task (owner only)

### Security Features
- Password hashing with bcrypt
- JWT authentication for protected endpoints
- Request validation with DTOs
- Proper error handling and status codes

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- PostgreSQL database
- npm or yarn

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd icn-api
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file with your database credentials:
```
DATABASE_URL="postgresql://user:password@localhost:5432/task_manager"
DIRECT_URL="postgresql://user:password@localhost:5432/task_manager"
JWT_SECRET="your_secure_jwt_secret"
PORT=4000
NODE_ENV=development
```

### Step 4: Setup Database
```bash
npx prisma migrate dev
```

This will create the database schema and generate Prisma client.

### Step 5: Run Development Server
```bash
npm run dev
```

Server will start on `http://localhost:4000`

## 📚 API Endpoints Documentation

### Base URL
```
http://localhost:4000
```

### Authentication Endpoints

#### Register User
```
POST /users
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "message": "Register successful",
  "data": {
    "id": "uuid",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /users/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "john@example.com"
    }
  }
}
```

### User Endpoints

#### Get All Users
```
GET /users

Response (200):
{
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-03-27T10:00:00Z",
      "updatedAt": "2024-03-27T10:00:00Z"
    }
  ]
}
```

#### Get User by ID
```
GET /users/:id

Response (200):
{
  "message": "User retrieved successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-27T10:00:00Z",
    "updatedAt": "2024-03-27T10:00:00Z",
    "tasks": [
      {
        "id": "uuid",
        "title": "Buy groceries",
        "description": "Buy milk and bread",
        "isCompleted": false,
        "createdAt": "2024-03-27T10:00:00Z"
      }
    ]
  }
}
```

#### Update User (Requires Auth)
```
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}

Response (200):
{
  "message": "User updated successfully",
  "data": {
    "id": "uuid",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2024-03-27T10:00:00Z",
    "updatedAt": "2024-03-27T10:30:00Z"
  }
}
```

#### Delete User (Requires Auth)
```
DELETE /users/:id
Authorization: Bearer <token>

Response (200):
{
  "message": "User deleted successfully"
}
```

### Task Endpoints

#### Create Task (Requires Auth)
```
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "title": "Buy groceries",
  "description": "Buy milk and bread"
}

Response (201):
{
  "message": "Task created successfully",
  "data": {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Buy milk and bread",
    "isCompleted": false,
    "userId": "uuid",
    "createdAt": "2024-03-27T10:00:00Z",
    "updatedAt": "2024-03-27T10:00:00Z"
  }
}
```

#### Get All Tasks
```
GET /tasks

Response (200):
{
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "title": "Buy groceries",
      "description": "Buy milk and bread",
      "isCompleted": false,
      "userId": "uuid",
      "user": {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-03-27T10:00:00Z",
      "updatedAt": "2024-03-27T10:00:00Z"
    }
  ]
}
```

#### Get Current User's Tasks (Requires Auth)
```
GET /tasks/my-tasks
Authorization: Bearer <token>

Response (200):
{
  "message": "User tasks retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "title": "Buy groceries",
      "description": "Buy milk and bread",
      "isCompleted": false,
      "userId": "uuid",
      "createdAt": "2024-03-27T10:00:00Z",
      "updatedAt": "2024-03-27T10:00:00Z"
    }
  ]
}
```

#### Get Task by ID
```
GET /tasks/:id

Response (200):
{
  "message": "Task retrieved successfully",
  "data": {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Buy milk and bread",
    "isCompleted": false,
    "userId": "uuid",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-03-27T10:00:00Z",
    "updatedAt": "2024-03-27T10:00:00Z"
  }
}
```

#### Get Tasks by User ID
```
GET /users/:id/tasks

Response (200):
{
  "message": "User tasks retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "title": "Buy groceries",
      "description": "Buy milk and bread",
      "isCompleted": false,
      "userId": "uuid",
      "createdAt": "2024-03-27T10:00:00Z",
      "updatedAt": "2024-03-27T10:00:00Z"
    }
  ]
}
```

#### Update Task (Requires Auth)
```
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "title": "Buy groceries and cook",
  "description": "Buy milk, bread and cook dinner",
  "isCompleted": true
}

Response (200):
{
  "message": "Task updated successfully",
  "data": {
    "id": "uuid",
    "title": "Buy groceries and cook",
    "description": "Buy milk, bread and cook dinner",
    "isCompleted": true,
    "userId": "uuid",
    "createdAt": "2024-03-27T10:00:00Z",
    "updatedAt": "2024-03-27T10:30:00Z"
  }
}
```

#### Delete Task (Requires Auth)
```
DELETE /tasks/:id
Authorization: Bearer <token>

Response (200):
{
  "message": "Task deleted successfully"
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Token) for authentication. When registering or logging in, you'll receive a token that must be included in subsequent requests.

### How to Use:
1. Register a new user or login to get a token
2. Include the token in the `Authorization` header: `Authorization: Bearer <token>`
3. Token is valid for 1 day

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  password  String
  tasks     Task[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
}
```

### Task Model
```prisma
model Task {
  id          String    @id @default(uuid())
  title       String
  description String?
  isCompleted Boolean   @default(false)
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  deletedAt   DateTime?
}
```

## 📝 Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Invalid input or validation error
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions (e.g., trying to delete another user's task)
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### Error Response Format:
```json
{
  "message": "Error description"
}
```

## 🧪 Testing

You can test the API using:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/)
- `curl` command line tool

## 📦 Project Structure

```
src/
├── app.ts                 # Express app setup
├── controllers/           # Request handlers
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   └── task.controller.ts
├── services/             # Business logic
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── task.service.ts
│   └── dto/
│       ├── auth.dto.ts
│       └── task.dto.ts
├── routes/              # API routes
│   ├── auth.route.ts
│   ├── user.route.ts
│   └── task.route.ts
├── middlewares/         # Custom middlewares
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── utils/              # Utility functions
│   ├── api.error.ts
│   └── hash.ts
└── lib/               # Libraries
    └── prisma.ts

prisma/
├── schema.prisma      # Database schema
└── migrations/        # Database migrations
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run tests (if configured)
npm run test
```

## 📖 Database Migrations

To create a new migration after modifying the schema:
```bash
npx prisma migrate dev --name <migration_name>
```

To view database in Prisma Studio:
```bash
npx prisma studio
```

## 🚀 Deployment

### Environment Variables for Production:
- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Use production PostgreSQL database URL
- Set appropriate `PORT`

### Deployment Platforms:
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

## 📄 License

MIT

## 👨‍💻 Author

Your Name

## 📞 Support

For issues and questions, please open an issue in the repository.
