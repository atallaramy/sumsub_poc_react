# SumSub ID Verification POC (React)

A modern React application for identity verification using SumSub's WebSDK and REST API, built with React, TypeScript, and Vite.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Terminal 1 - Start backend server
npm run server:dev

# Terminal 2 - Start React frontend
npm run dev
```

Then open http://localhost:5173

## Features

- 🔐 Secure ID verification with multiple levels
- ⚛️ Modern React with TypeScript and hooks
- 📱 Responsive design with custom CSS
- ⚡ Real-time verification status updates
- 🔄 Automatic token refresh handling
- 📊 Verification level selection dropdown
- 🎨 Beautiful gradient UI with smooth transitions

## Available Verification Levels

- **Basic KYC Level** - Basic identity verification
- **ID Only** - Document verification only
- **ID and Liveness** - Document + liveness check (default)
- **IDV and Phone Verification** - Full verification with phone

## Prerequisites

- Node.js 18+
- SumSub account with API credentials

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Update `.env.local` with your SumSub credentials:
   ```env
   SUMSUB_APP_TOKEN=your_app_token
   SUMSUB_SECRET_KEY=your_secret_key
   SUMSUB_LEVEL_NAME=id-and-liveness
   SUMSUB_ENVIRONMENT=sandbox
   PORT=3000
   ```

3. **Start the development servers:**

   Terminal 1 - Backend server:
   ```bash
   npm run server:dev
   ```

   Terminal 2 - React development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start React development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start backend server
- `npm run server:dev` - Start backend server with auto-reload

## Project Structure

```
├── src/
│   ├── components/         # React components
│   │   ├── InitialScreen.tsx
│   │   ├── VerificationScreen.tsx
│   │   ├── StatusMessage.tsx
│   │   └── LoadingSpinner.tsx
│   ├── services/          # API service layer
│   │   └── api.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx            # Main application component
│   ├── App.css            # Component styles
│   ├── index.css          # Global styles
│   └── main.tsx           # Application entry point
├── server/
│   └── server.ts          # Express backend with TypeScript
├── index.html             # Vite HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # TypeScript config for Node.js files
├── package.json           # Dependencies and scripts
└── .env.local            # Environment variables (not in git)
```

## API Endpoints

- `POST /api/access-token` - Generate verification token
- `POST /api/refresh-token` - Refresh expired token
- `GET /api/applicant/:id` - Check verification status

## Usage

1. Open http://localhost:5173 (React dev server)
2. Backend runs on http://localhost:3000
3. Enter a unique user ID (auto-generated)
4. Select verification level
5. Click "Start Verification Process"
6. Complete the verification steps
7. Check status using the status button

## Technology Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Custom CSS
- **Backend:** Node.js, Express, TypeScript
- **API Client:** Axios
- **SDK:** SumSub React WebSDK
- **Development:** tsx, nodemon

## Development Features

- Hot module replacement (HMR)
- TypeScript type checking
- Automatic server restart
- Modern React hooks
- Component-based architecture
- Responsive design

## Environment

- **Sandbox:** For testing (default)
- **Production:** For live verification

---

*This is a proof of concept for demonstration purposes.*