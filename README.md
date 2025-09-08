# 🌟 Thinkfy – AI-Powered Distraction-Free Learning Platform

[![OpenAI Powered](https://img.shields.io/badge/AI-Quiz%20Generator-blue)](#features)
[![Made with React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react)](#tech-stack)
[![Backend Node.js](https://img.shields.io/badge/Backend-Node.js-43853D?logo=node.js)](#tech-stack)
[![Database MongoDB](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)](#tech-stack)

> **Thinkfy** is an **AI-powered, distraction-free learning platform** where students can import YouTube playlists and turn them into structured courses.  
> After each video, an **AI-generated quiz** tests your understanding, and you can track your progress via an interactive **dashboard**.

---

## 🚀 Features

### 🧑‍🎓 For Learners
- 🎥 **Turn YouTube playlists into structured courses**
- 🧠 **AI-generated quizzes** after each video to test learning
- 📊 **Personalized progress dashboard** to track completed videos and quiz scores
- ⏳ **Distraction-free environment** focused on efficient learning
- 🔄 Continue learning exactly where you left off

### 🛠 For Developers
- Full-stack web platform with modular architecture
- RESTful APIs for playlist management, user authentication, and quizzes
- AI integration using **OpenAI** models for quiz generation
- Scalable database structure for tracking user progress

---

## 🏗 Tech Stack <a name="tech-stack"></a>

### **Frontend**
- React.js
- Tailwind CSS for styling
- Axios for API integration

### **Backend**
- Node.js + Express.js
- OpenAI API for AI-powered quiz generation
- YouTube Data API v3 for playlist & video data
- JWT-based authentication

### **Database**
- MongoDB (user data, playlists, quizzes, progress tracking)

### **AI Model**
- Uses GPT-based APIs or custom ML models to:
  - Summarize video transcripts
  - Generate **context-aware quizzes**
  - Evaluate quiz answers

---

## 📂 Project Structure

```bash
Thinkfy/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-based routing
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Helper functions
├── server/                 # Node.js backend
│   ├── controllers/        # Business logic
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── middlewares/        # Auth & validations
│   ├── services/           # AI & YouTube integrations
│   └── config/             # Environment configs
├── docs/                   # Documentation & screenshots
├── .env.example            # Environment variables template
├── package.json            # Project metadata
└── README.md               # Project documentation

