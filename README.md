# Node Agent - Automation System

A Node.js microservice for automating listing management and user engagement through intelligent email communications.

## 🚀 Features

- **Automated Email System**
  - Transactional emails via Gmail SMTP
  - HTML and plain text support
  - Email tracking and logging
- **User Management**
  - User CRUD operations
  - Activity monitoring
  - Inactive user detection
  - Paginated user listings with count
- **Listing Management**
  - Property listing creation
  - Visit tracking
  - Automated pricing suggestions
- **Interaction Tracking**
  - System event logging
  - User engagement tracking
  - Price suggestion history
  - Paginated interaction logs with count
- **Intelligent Automation**
  - AI-powered message generation using Google GenAI
  - Smart pricing recommendations
  - Scheduled re-engagement campaigns

## 🛠 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Nodemailer with Gmail
- **Scheduling**: node-cron
- **AI**: Google GenAI (Gemini)
- **API**: RESTful endpoints
- **Code Quality**: ESLint, Prettier

## 📋 Prerequisites

- Node.js (v16+)
- PostgreSQL
- Gmail account
- Google GenAI API key

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

Start the development server:

```bash
npm run dev
```

Start in production:

```bash
npm start
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
│   ├── index.js
│   └── mailer.js
├── models/
│   └── prisma.js
├── routes/
│   └── webhook.js
├── services/
│   ├── email-service.js
│   └── scheduler.js
└── index.js
```

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
```

## 🔍 Monitoring

The system logs:

- Email sending attempts
- User interactions
- Listing performance
- System errors

## 📝 License

This project is licensed under the ISC License.
