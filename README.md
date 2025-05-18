# Prodoc Frontend

A modern document management system built with React and Vite, featuring a beautiful UI and powerful functionality.

## 🚀 Features

- Modern and responsive user interface
- Document management and organization
- Integration with Google's Generative AI
- Real-time updates and interactions
- Secure authentication system
- Beautiful animations using Framer Motion

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 6
- **Styling:** 
  - Tailwind CSS
  - Ant Design
  - Custom CSS
- **State Management:** React Context API
- **Routing:** React Router DOM 7
- **HTTP Client:** Axios
- **UI Components:** 
  - Ant Design
  - Heroicons
- **Animation:** Framer Motion
- **Date Handling:** date-fns
- **AI Integration:** Google Generative AI

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prodoc/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```env
VITE_API_URL=your_backend_url
VITE_GOOGLE_AI_KEY=your_google_ai_key
```

4. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

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

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

The project uses several configuration files:

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries
