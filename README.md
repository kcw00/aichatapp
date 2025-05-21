# AIChat App

A modern, responsive ai chat application built with **React**, **Node.js**, and **OpenAI's GPT-3.5-Turbo**.


---
## 📸 Live Demo

Try it here: https://aichatapp-rho.vercel.app/

![ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/e5c375a9-996f-4d68-a42d-c74ac524e976)

---

## ✨ Features

- 🔮 **GPT-3.5 Integration** via OpenAI API
- 🌐 Backend hosted on **DigitalOcean**, frontend on **Vercel**
- 🎨 **Responsive UI** with Bootstrap 5 & Bootstrap Icons
- 🌙 **Dark/Light Mode** toggle
- 📩 **Real-time chat UI** with message bubbles and icons
- 🧭 **Collapsible Sidebar** with smooth transitions
- 💬 **Markdown support** with:
  - Inline code
  - Syntax-highlighted code blocks with language labels
  - Copy-to-clipboard buttons for code blocks
- 🚀 **Proxy-enabled Backend Routing** via Vite
- 🛡️ Secure API key handling with `.env`
- ⚙️ Automated **CI/CD** pipeline using **GitHub Actions** for seamless deployment

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Bootstrap 5 + Bootstrap Icons
- Axios
- Custom CSS transitions
- React markdown

**Backend:**
- Node.js / Express
- OpenAI API (gpt-3.5-turbo)
- CORS & Environment Config

---

## ⚙️ Getting Started

### 🔧 Prerequisites
- Node.js & npm
- OpenAI API key ([Get one here](https://platform.openai.com/account/api-keys))

### 🚀 Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/aichat.git
cd aichat
```

2. **Install dependencies**

```bash
cd frontend && npm install axios bootstrap bootstrap-icons esbuild react react-dom
```
```bash
cd backend && npm install cors dotenv express openai
```

3. **Set up environment variables**

Create `.env` file in both frontend and backend folder

`backend/.env`
```bash
OPENAI_API_KEY=your_openai_api_key_here
```
`frontend/.env`
```bash
VITE_BACKEND_URL=http://localhost:3000
```

4. **Start both backend and frontend**

```bash
cd frontend && npm run dev
```
```bash
cd backend && npm run dev
```

5. **Open http://localhost:5173 in your browser.**

---

## CI/CD Pipeline

This project is fully automated with a secure and reliable CI/CD setup using **GitHub Actions**.

### Workflow Overview
- **Frontend Deployment**: Automatically deployed to [Vercel](https://vercel.com/) after each successful merge to `main`.
- **Backend Deployment**: Automatically deployed to a [DigitalOcean](https://www.digitalocean.com/) droplet using SSH and `pm2` after merging to `main`.

### Branch Protection Rules
To maintain code quality and production stability:
- All changes must go through a **Pull Request**
- **1 required review** must be approved before merging
- **Stale PR approvals** are dismissed on new commits
- The `main` branch **only allows merging after all GitHub Actions pass**

### Required Check
- `deploy.yml` must succeed before merging to `main`

This ensures every change is reviewed, tested, and deployed automatically — keeping production up-to-date and safe.

