# 📄 Taskster - Task Management Application

**Prodoc** is a modern **MERN Stack Task Management App** designed to help users efficiently manage tasks with features like secure authentication, task categorization, filtering, and AI-powered enhancements. It combines beautiful UI, responsive design, and real-time functionality to deliver a seamless task management experience.

---

## 🧠 About the Project

This project was built as part of a company assignment to demonstrate full-stack development capabilities using the MERN stack. It includes:
- Frontend in **React + Vite**, styled with **Tailwind CSS** and **Ant Design**
- Backend in **Node.js + Express**, with **MongoDB** as the database
- Secure user authentication using **JWT**
- AI features powered by **Google Generative AI**

It showcases essential development skills such as RESTful API creation, state management, protected routing, and dynamic UI building. AI tools like ChatGPT and Gemini were also utilized to streamline development and troubleshooting.

---

## 🚀 Features

- 🔐 **User Authentication** with JWT
- 📝 **CRUD Operations** for tasks
- 🗂️ **Task Categorization & Filtering**
- 📅 **Due Date Management**
- 🧠 **AI Assistance** using Google Generative AI (e.g., task suggestions)
- 📱 **Responsive UI** (mobile-first design)
- 🎨 **Beautiful Animations** with Framer Motion
- ⚡ **Real-time UI Interactions**

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite 6**
- **Tailwind CSS**, **Ant Design**, **Custom CSS**
- **React Router DOM 7**, **Axios**
- **Framer Motion**, **Heroicons**
- **date-fns** for date handling
- **Google Generative AI API**

### Backend
- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**, **bcrypt**
- **CORS**, **Helmet** for security

---

## 📦 Installation & Setup


# In a new terminal, go to the backend
cd ../backend
npm install

# Create .env in the backend directory
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

# Start backend
npm run dev

```
src/
├── assets/        # Static assets like images and fonts
├── components/    # Reusable UI components
├── context/       # React context providers
├── pages/         # Page components
├── utils/         # Utility functions and helpers
├── App.jsx        # Main application component
├── main.jsx       # Application entry point
└── index.css      # Global styles
```

🚀 Deployment
✅ Live: https://task-manager-seven-tau.vercel.app

You can deploy the backend to Render or Railway, and use MongoDB Atlas for cloud DB.


# Scripts
| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start development server       |
| `npm run build`   | Build for production           |
| `npm run preview` | Preview the production build   |
| `npm run lint`    | Lint the codebase using ESLint |


# 👨‍💻 Author
- Parth Tandalwade
- 🔗 [GitHub](https://github.com/KhanjarSingh)
- 🔗 [Linkedin](https://www.linkedin.com/in/parth-tandalwade-295882323/)
