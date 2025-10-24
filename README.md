# Node Agent - Real Estate Listing Management System

A Node.js microservice for managing real estate listings, user interactions, and automated communications with AI-powered insights.

## 🚀 Features

- **Listing Management**
  - Create and manage property listings
  - Track listing views and engagement
  - Automated pricing suggestions
  - Photo management

- **User Management**
  - User CRUD operations
  - Activity monitoring
  - Inactive user detection
  - Paginated user listings

- **Interaction Tracking**
  - System event logging
  - User engagement tracking
  - Price suggestion history
  - Webhook integration

- **Intelligent Automation**
  - AI-powered message generation using Google GenAI
  - Smart pricing recommendations
  - Automated email notifications
  - Webhook event handling

## 🛠 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Nodemailer with Gmail
- **AI**: Google GenAI (Gemini)
- **API**: RESTful endpoints with JSON:API specification
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, Supertest

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- Gmail account (for email notifications)
- Google GenAI API key (for AI features)

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/node-agent.git
cd node-agent
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
GEMINI_API_KEY="your-gemini-api-key"
GEMINI_MODEL="your-gemini-model"
EMAIL_FROM="your@gmail.com"
EMAIL_USER="your@gmail.com"
EMAIL_PASSWORD="your-app-specific-password"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=465
PORT=4000
```

5. Initialize the database:

```bash
npx prisma generate
npx prisma db push
```

## 🚦 Usage

### Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server with hot-reload
npm run dev
```

### Production

```bash
# Install production dependencies
npm install --production

# Run database migrations
npx prisma migrate deploy

# Start production server
npm start
```

## 🌐 API Endpoints

### Users

- `POST /users` - Create a new user

  ```json
  {
    "email": "user@example.com",
    "name": "John Doe"
  }
  ```

  Response (202 Accepted):

  ```json
  {
    "ok": true,
    "message": "User creation request received",
    "data": {
      "email": "user@example.com",
      "name": "John Doe",
      "id": "user-id-123"
    }
  }
  ```

- `GET /users` - List all users (paginated)

  ```
  GET /users?page=0&total=10
  ```

  Response (200 OK):

  ```json
  {
    "ok": true,
    "users": [
      {
        "id": "user-id-123",
        "email": "user1@example.com",
        "name": "John Doe",
        "createdAt": "2025-10-23T21:42:00.000Z"
      },
      {
        "id": "user-id-456",
        "email": "user2@example.com",
        "name": "Jane Smith",
        "createdAt": "2025-10-22T15:30:00.000Z"
      }
    ],
    "count": 2
  }
  ```

- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Listings

- `POST /listings` - Create a new listing
  ```json
  {
    "ownerId": "user-id",
    "title": "Beautiful Apartment",
    "price": 150000,
    "description": "Lovely 2-bedroom apartment",
    "photos": ["photo1.jpg", "photo2.jpg"]
  }
  ```

### Webhooks

- `POST /webhook` - Handle system events
  ```json
  {
    "type": "listing.created",
    "payload": {
      "id": "listing-id",
      "ownerId": "user-id",
      "title": "Listing Title",
      "price": 150000,
      "description": "Listing description",
      "photos": ["photo1.jpg"]
    }
  }
  ```

## 📝 Environment Variables

| Variable         | Description                  | Required | Default        |
| ---------------- | ---------------------------- | -------- | -------------- |
| `PORT`           | Server port                  | No       | 3000           |
| `DATABASE_URL`   | PostgreSQL connection string | Yes      | -              |
| `JWT_SECRET`     | Secret for JWT tokens        | Yes      | -              |
| `GEMINI_API_KEY` | Google GenAI API key         | Yes      | -              |
| `EMAIL_FROM`     | Sender email address         | Yes      | -              |
| `EMAIL_USER`     | SMTP username                | Yes      | -              |
| `EMAIL_PASSWORD` | SMTP password                | Yes      | -              |
| `EMAIL_HOST`     | SMTP host                    | No       | smtp.gmail.com |
| `EMAIL_PORT`     | SMTP port                    | No       | 465            |

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

## 📡 API Endpoints

### Webhooks

POST `/webhook`

- Handles various system events
- Payload: `{ type: string, payload: object }`

Supported event types:

- `user.created`
- `listing.created`
- `listing.view`

## 📁 Project Structure

```

src/
├── config/
│ ├── index.js
│ └── mailer.js
├── models/
│ └── prisma.js
├── routes/
│ └── webhook.js
├── services/
│ ├── email-service.js
│ └── scheduler.js
└── index.js

````

## 📊 Database Schema

```prisma
model User {
  id           String
  email        String
  name         String?
  plan         String
  lastActiveAt DateTime
  // ...
}

model Listing {
  id          String
  title       String
  price       Int
  visits      Int
  // ...
}

model Interaction {
  id        String
  type      String
  payload   Json?
  // ...
}
````

## 🔍 Monitoring

The system logs:

- Email sending attempts
- User interactions
- Listing performance
- System errors

## 📝 License

This project is licensed under the ISC License.
