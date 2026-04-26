# OnlyExams - Online Examination Management System

OnlyExams is an Online Exam Management System designed to digitalize and streamline the entire examination lifecycle for educational institutions. It simplifies complex logistics, offering students a seamless interface for exams while providing educators with powerful analytics.

---

## 🚀 Quick Start / Initialization

To get the project running on your local machine, follow these precise steps:

### 1. Prerequisites
- Ensure you have **Node.js** (v18 or higher) installed.
- Use a modern web browser (Chrome, Edge, or Safari) for the best experience.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/abhay1074/OnlyExams.git
cd OnlyExams
npm install
```

### 3. Running the App
Start the development server:
```bash
npm run dev
```
The application will be available at **http://localhost:5173/**.

---

## 🔑 Demo Credentials
For testing purposes, use the following pre-configured accounts:
- **Administrator**: `admin@onlyexams.com` / `admin`
- **Student**: `student@onlyexams.com` / `student`

---

## ✨ Features Implemented
- **Premium UI**: Glassmorphic design system with smooth Framer Motion transitions.
- **Admin Console**: Dashboard with stats, Exam Creation Wizard, and Question Bank.
- **Student Portal**: Personalized exam schedules and performance history.
- **Secure Exam Room**: Live timer, anti-cheat visibility detection, and answer review.
- **Result Analytics**: Detailed candidate performance breakdown and class stats.

---

## 🛠️ Tasks for Teammates (Future Roadmap)
The following features are planned for the next phase of development. Teammates can pick these up to complete the system:

### 1. Backend & Database Integration
- [ ] **API Development**: Replace the current `Mock Context` with a real backend (Node.js/Express, Python/FastAPI, or Java/Spring Boot).
- [ ] **Persistence**: Connect the system to a database (PostgreSQL or MySQL) to store users, exams, and results permanently.

### 2. Advanced Proctoring & Security
- [ ] **Webcam Monitoring**: Integrate a WebRTC-based proctoring system to monitor student video/audio.
- [ ] **Browser Lockdown**: Implement more robust checks for exiting full-screen mode or using disallowed keyboard shortcuts.
- [ ] **IP Tracking**: Log and verify student IP addresses to prevent multi-device login during exams.

### 3. Enhanced Content Management
- [ ] **Media Support**: Add functionality to upload images, diagrams, or PDFs to questions.
- [ ] **Bulk Import**: Create a feature to import questions via Excel/CSV files.
- [ ] **Question Types**: Add support for Fill-in-the-blanks, Match-the-following, and Subjective (Essay) questions with manual marking.

### 4. Communication & Notifications
- [ ] **Email Service**: Implement automated emails for exam registration, schedules, and result declarations.
- [ ] **Real-time Chat**: Add a support chat for students to contact proctors during technical issues.

### 5. UI/UX Polishing
- [ ] **Dark/Light Mode**: Add a toggle for user preference.
- [ ] **Mobile Optimization**: Refine the Exam Room layout for better experience on tablets and smartphones.
- [ ] **Theme Customization**: Allow institutions to change brand colors and logos.

---

## 🏗️ Tech Stack
- **Frontend**: React + Vite + Framer Motion
- **Icons**: Lucide-React
- **Styling**: Vanilla CSS (Custom Premium Tokens)
- **State**: React Context API
