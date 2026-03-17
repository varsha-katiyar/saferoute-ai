
# SafeRoute AI – AI-Based Safe Navigation Platform for Women

## 🚀 Project Overview

**SafeRoute AI** is a hackathon project aimed at enhancing women’s safety during travel. The platform prioritizes safety over distance or speed and integrates AI-powered guidance.

### Key Features:

- Safe route generation with safety scores  
- Emergency SOS alerts  
- Help & Support section with tips  
- AI-powered Safety Assistant Chatbot  

**Tech Stack:** React, TailwindCSS, OpenAI GPT API, Leaflet.js, Firebase  

---

## 📌 Features

### 1. Safe Route Finder

- Input start and destination locations  
- View safest routes highlighted in green  
- Safety score displayed for each route  

### 2. Emergency SOS

- Press **SOS** for instant alerts to trusted contacts  
- Shows emergency numbers and nearby help centers  

### 3. Help & Support

- Step-by-step instructions on using the platform  
- Travel safety tips  
- Contact support: **support@saferoute.ai**  

### 4. AI Safety Assistant Chatbot

- Ask any safety-related question  
- Works on both desktop and mobile  
- Provides real-time AI-powered safety advice  

---

## 🛠 Tech Stack

- **Frontend:** React.js, TailwindCSS, React Router DOM  
- **AI:** OpenAI GPT API  
- **Maps:** Leaflet.js  
- **Backend:** Firebase (Firestore + Cloud Functions)  

---

## 🏗 Project Structure

/saferoute-ai
├─ /public
│ └─ index.html
├─ /src
│ ├─ /components
│ │ ├─ ChatBot.jsx
│ │ ├─ HelpCenter.jsx
│ │ ├─ LiveTracking.jsx
│ │ ├─ MapView.jsx
│ │ ├─ Navbar.jsx
│ │ ├─ RouteSearch.jsx
│ │ ├─ SafetyHeatMap.jsx
│ │ ├─ SafetyScore.jsx
│ │ ├─ SOSButton.jsx
│ │ └─ UserLocation.jsx
│ │
│ ├─ /pages
│ │ ├─ Emergency.jsx
│ │ ├─ Help.jsx
│ │ ├─ Home.jsx
│ │ └─ TrackPage.jsx
│ │
│ ├─ App.jsx
│ └─ main.jsx
├─ .env
├─ package.json
└─ README.md


---

## 🟡 Demo & Submission Links

### 🚀 Live Demo
[Click here to view demo](https://saferoute-ai-demo.vercel.app)

### 📄 Solution PDF
[View Solution PDF](https://drive.google.com/file/d/1kwiMGh6E8BCcw-h8tOq8bW7Lmb_i-5Mp/view)

### 🌐 Live Project
[Open Deployed Project](https://saferoute-ai-three.vercel.app)

---

## 🔥 Firebase Setup

### 1. Create Project
- Go to Firebase Console  
- Create project: **SafeRoute AI**  
- Enable Firestore Database  

### 2. Collections
- `messages` → chatbot history  
- `sos_alerts` → emergency triggers  
- `user_locations` → live tracking  

### 3. Cloud Functions Setup
```bash
firebase init functions
npm install axios

Setup Instructions (Frontend)
1. Clone Repository
git clone <your-repo-link>
cd saferoute-ai
2. Install Dependencies
npm install
3. Create .env File
VITE_OPENAI_KEY=your_openai_api_key
4. Run Project
npm run dev

Open: http://localhost:5173

⚙️ Usage

Home Page → Enter locations → Find safe route

Help Page → Get safety tips

Emergency Page → Trigger SOS alerts

Chatbot → Ask safety-related questions

📌 Future Improvements

Real-time crime data integration

Voice-enabled emergency commands

AI-based risk prediction
