# Node Agent

A Node.js application that manages real estate listings with automated user engagement features.

## Features

- User management with engagement tracking
- Property listing creation and management
- Automated email notifications
- Smart pricing suggestions based on listing performance
- Webhook integration for events
- Scheduled tasks for user re-engagement

## Tech Stack

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- OpenAI API
- Node Mailer
- Node Cron

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- OpenAI API key
- Gmail account for email notifications

## Installation

1. Clone the repository
2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file with the following variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
OPENAI_API_KEY="your-api-key"
EMAIL_FROM="your@email.com"
EMAIL_USER="your@email.com"
EMAIL_PASSWORD="your-password"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=465
HTTP_PORT=4000
```

4. Run Prisma migrations:
```sh
npm run prisma migrate dev
```

## Usage

Start the server:
```sh
npm start
```

The server will start on the port specified in your `.env` file.

## API Endpoints

### POST /webhook
Handles various events:
- `user.created`: Creates new user and sends welcome email
- `listing.created`: Creates new listing and suggests improvements
- `listing.view`: Tracks listing views and suggests upgrades

## Database Schema

### User
- id: String (Primary Key)
- email: String (Unique)
- name: String?
- plan: String
- createdAt: DateTime
- lastActiveAt: DateTime

### Listing
- id: String (Primary Key)
- ownerId: String (Foreign Key)
- title: String
- description: String?
- price: Integer
- photos: String[]
- visits: Integer
- reservations: Integer
- createdAt: DateTime

### Interaction
- id: String (Primary Key)
- type: String
- payload: Json?
- userId: String? (Foreign Key)
- listingId: String? (Foreign Key)
- createdAt: DateTime

## License

ISC