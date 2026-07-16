# Specter FinTech

A premium, luxury Financial Management and Analytics application built with the **MERN** Stack (MongoDB, Express, React, Node.js). 

I built this project from the ground up to showcase a modern, high-performance web application utilizing modern design principles and responsive interfaces. The app utilizes Bento structuralism, dark-mode glassmorphism (`backdrop-blur`), and seamless state management.

## Key Features

- **Full-Stack Architecture**: React frontend powered by Vite, seamlessly connected to a robust Express backend.
- **Database Integration**: Persists user profiles, customizable settings, and scalable transaction expenses using MongoDB.
- **Premium Dark Mode**: Seamless theme switching utilizing custom configured Tailwind CSS v4 variables with fluid transitions.
- **Dynamic Dashboard**: Beautiful interactive components rendering financial metrics and transaction feeds.
- **Intelligent Tracking**: Features an OCR scanning API endpoint that intelligently maps receipt images into detailed transaction logs.

## Setup & Local Development

**Prerequisites:**  Node.js (v18+)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Make sure you hook up your `MONGO_URI` and any necessary API keys (like `GEMINI_API_KEY` for OCR features) inside an `.env` file.
3. Run the application locally:
   ```bash
   npm run dev
   ```

## Tech Stack
- Frontend: React 18, TypeScript, Tailwind CSS v4, Lucide-React
- Backend: Node.js, Express.js
- Database: MongoDB & Mongoose
- Tooling: Vite, Vercel

---
*Developed by Nishant Chhetri*
