# Node Agent - Real Estate Automation System

A Node.js microservice for automating real estate listing management and user engagement through intelligent email communications.

## 🚀 Features

- **Automated Email System**
  - Transactional emails via Gmail SMTP
  - HTML and plain text support
  - Email tracking and logging
  
- **User Management**
  - User creation and tracking
  - Activity monitoring
  - Engagement metrics
  
- **Listing Management**
  - Property listing creation
  - Visit tracking
  - Automated suggestions based on performance
  
- **Intelligent Automation**
  - AI-powered message generation
  - Smart pricing recommendations
  - Engagement-based upgrade suggestions

## 🛠 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Nodemailer with Gmail
- **Scheduling**: node-cron
- **AI**: OpenAI API integration
- **Type Safety**: TypeScript

## 📋 Prerequisites

- Node.js (v16+)
- PostgreSQL
- Gmail account
- OpenAI API key

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
OPENAI_API_KEY="your-openai-api-key"
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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support, email support@yourdomain.com or create an issue in the repository.