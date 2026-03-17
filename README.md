
# SafeRoute AI – AI-Based Safe Navigation Platform for Women

## 🚀 Project Overview

**SafeRoute AI** is a hackathon project aimed at enhancing women’s safety during travel. The platform prioritizes safety over distance or speed and integrates AI-powered guidance. Key features include:

- Safe route generation with safety scores.
- Emergency SOS alerts.
- Help & Support section with tips.
- AI-powered Safety Assistant Chatbot for dynamic safety advice.

Technologies used: **React, TailwindCSS, OpenAI GPT API, Leaflet.js**.

---

## 📌 Features

### 1. Safe Route Finder

- Input start and destination locations.
- View safest routes highlighted in green.
- Safety score displayed for each route.

### 2. Emergency SOS

- Press **SOS** for instant alerts to trusted contacts.
- Shows emergency numbers and nearby help centers.

### 3. Help & Support

- Step-by-step instructions on using the platform.
- Travel safety tips.
- Contact support email: **support@saferoute.ai**

### 4. AI Safety Assistant Chatbot

- Ask any safety-related question.
- Collapsible interface on desktop and mobile.
- Provides advice on routes, emergencies, police stations, and travel safety tips.
- Powered by OpenAI GPT API.

---

## 🛠 Tech Stack

- **Frontend:** React.js, TailwindCSS, React Router DOM
- **AI:** OpenAI GPT API
- **Map & Routing:** Leaflet.js
- **Backend (Optional for AI proxy):** Node.js + Express

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

## ⚡ Setup Instructions (Frontend)


---

## 🟡 Demo & Submission Links

- **Live Demo:** [Click Here](https://saferoute-ai-demo.vercel.app)  
- **Solution PDF:** [Download PDF](https://your-storage-link.com/SafeRouteAI_Solution.pdf)  
- **Deployed Project:** [Vercel Deployment](https://saferoute-ai.vercel.app)  

---

## 🟡 Setup Instructions (Frontend)

1. Clone the repository:

```bash
git clone <your-repo-link>
cd saferoute-ai

Install dependencies:

npm install

Create .env file in project root:

# Replace with your OpenAI API key
VITE_OPENAI_KEY=sk-XXXXXXXXXXXXXXXXXXXX

Start development server:

npm run dev   # If using Vite
# OR
npm start     # If using CRA

Open http://localhost:5173
 in your browser.

⚙️ Usage

Home Page – Enter start and destination → Click Find Safe Route.

Help Page – Step-by-step guidance and safety tips.

Emergency Page – Press SOS to alert contacts.

Safety Assistant Chatbot – Ask any safety question → get AI-powered advice.

