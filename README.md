# URL Shortener Application 🔗

A modern, full-stack URL shortener application built with React.js and Express.js, featuring a beautiful Material-UI interface and real-time analytics.

## 🌐 Live Demo

**🚀 [View Live Application](https://22-b91-a6255.vercel.app/)**

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- **🔗 URL Shortening**: Convert long URLs into short, manageable links
- **⏰ Custom Expiry**: Set custom validity periods for shortened URLs
- **🎯 Custom Short Codes**: Create personalized short codes for your URLs
- **📊 Analytics Dashboard**: View detailed statistics and click tracking
- **📱 Responsive Design**: Fully responsive interface that works on all devices

### Advanced Features
- **🚀 Bulk URL Processing**: Shorten multiple URLs simultaneously
- **📋 One-Click Copy**: Easy copy-to-clipboard functionality
- **🎨 Modern UI**: Beautiful Material-UI components with smooth animations
- **⚡ Real-time Updates**: Live statistics and instant feedback
- **🔄 Auto-refresh**: Automatic data updates for real-time monitoring

## 🛠️ Technology Stack

### Frontend
- **React.js 19.1.0** - Modern JavaScript library for building user interfaces
- **Material-UI (MUI) 7.1.2** - React component library for faster development
- **React Router DOM 7.6.2** - Declarative routing for React applications
- **Framer Motion 12.19.1** - Production-ready motion library for React
- **Lucide React 0.523.0** - Beautiful & consistent icon toolkit
- **Axios 1.10.0** - Promise-based HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Fast, unopinionated web framework for Node.js
- **CORS 2.8.5** - Cross-Origin Resource Sharing middleware
- **dotenv 16.6.0** - Environment variable management

### Development Tools
- **React Scripts 5.0.1** - Configuration and scripts for Create React App
- **Nodemon 3.0.1** - Development utility for auto-restarting server
- **Testing Library** - Simple and complete testing utilities

## 📁 Project Structure

```
22B91A6255/
├── client/                    # React Frontend Application
│   ├── public/               # Static assets
│   │   ├── index.html       # Main HTML template
│   │   ├── favicon.ico      # Application favicon
│   │   ├── logo192.png      # PWA logo (192x192)
│   │   ├── logo512.png      # PWA logo (512x512)
│   │   ├── manifest.json    # PWA manifest
│   │   └── robots.txt       # Search engine instructions
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.jsx              # Navigation component
│   │   │   ├── UrlShortenerForm.jsx    # Main URL shortening form
│   │   │   └── UrlStatsTable.jsx       # Statistics table component
│   │   ├── pages/           # Page components
│   │   │   ├── ShortenerPage.jsx       # Main shortener page
│   │   │   └── StatsPage.jsx           # Analytics page
│   │   ├── services/        # API and utility services
│   │   │   ├── api.js                  # API communication layer
│   │   │   └── logger.js               # Logging service
│   │   ├── styles/          # Global styles
│   │   │   └── globals.css             # Global CSS styles
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Application entry point
│   ├── package.json         # Frontend dependencies
│   └── .env                 # Environment variables
├── backend/                  # Express.js Backend Application
│   ├── middlewares/         # Custom middleware
│   │   └── logger.js                   # Request logging middleware
│   ├── routes/              # API route handlers
│   │   ├── log.js                      # Logging endpoints
│   │   └── shorturl.js                 # URL shortening endpoints
│   ├── main.js              # Server entry point
│   └── package.json         # Backend dependencies
└── README.md                # Project documentation
```

## 🚀 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 22B91A6255
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up Environment Variables**
   
   Create a `.env` file in the client directory:
   ```env
   REACT_APP_SERVER_PORT=http://localhost:7000
   REACT_APP_ACCESS_TOKEN=your-access-token-here
   ```

5. **Start the Development Servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   # Server will start on http://localhost:7000
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm start
   # Application will open on http://localhost:3000
   ```

## 💻 Usage

### Shortening URLs

1. **Navigate to the homepage** at [https://22-b91-a6255.vercel.app/](https://22-b91-a6255.vercel.app/)
2. **Enter your long URL** in the input field
3. **Optional**: Set custom validity period (in minutes)
4. **Optional**: Create a custom short code
5. **Click "Shorten URL"** to generate your short link
6. **Copy the generated link** using the copy button

### Bulk URL Shortening

1. **Click the "+" button** to add more URL input fields
2. **Fill in multiple URLs** with their respective settings
3. **Process all URLs** simultaneously with one click
4. **Manage results** individually with copy/delete options

### Viewing Analytics

1. **Navigate to the Stats page** using the navigation menu
2. **View comprehensive analytics** including:
   - Total URLs shortened
   - Click statistics
   - Most popular links
   - Usage trends over time

## 🔌 API Endpoints

### URL Shortening Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `POST` | `/` | Shorten a new URL | `url`, `validity`, `shortcode` |
| `GET` | `/:shortcode` | Redirect to original URL | `shortcode` (path parameter) |

### Analytics Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/log/stats` | Get URL statistics |
| `GET` | `/log/analytics` | Get detailed analytics |

### Request/Response Examples

**Shorten URL Request:**
```json
{
  "url": "https://example.com/very-long-url",
  "validity": 60,
  "shortcode": "custom123"
}
```

**Shorten URL Response:**
```json
{
  "success": true,
  "data": {
    "shortLink": "https://short.ly/custom123",
    "originalUrl": "https://example.com/very-long-url",
    "expiry": "2025-06-27T15:30:00Z"
  }
}
```

## ⚙️ Environment Variables

### Client Environment Variables (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_SERVER_PORT` | Backend server URL | `http://localhost:7000` |
| `REACT_APP_ACCESS_TOKEN` | API authentication token | `your-jwt-token-here` |

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CLIENT_PORT` | Frontend URL for CORS | `http://localhost:3000` |
| `PORT` | Server port number | `7000` |

## 🌐 Deployment

### Frontend Deployment (Vercel)

The frontend is deployed on **Vercel** and automatically deploys from the main branch.

**Live URL**: [https://22-b91-a6255.vercel.app/](https://22-b91-a6255.vercel.app/)

### Backend Deployment

The backend is deployed on **Vercel** with serverless functions.

**API URL**: [https://version-2-0-0.vercel.app](https://version-2-0-0.vercel.app)

### Manual Deployment Steps

1. **Build the frontend**:
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

## 🧪 Testing

### Running Tests

**Frontend Tests:**
```bash
cd client
npm test
```

**Backend Tests:**
```bash
cd backend
npm test
```

### Test Coverage

The application includes comprehensive testing for:
- Component rendering and interaction
- API endpoint functionality
- Error handling and edge cases
- User interface responsiveness

## 🤝 Contributing

We welcome contributions to improve the URL Shortener application!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vakapalli H V Sai Surya Swapanth**
- Roll No: 22B91A6255
- Email: swapanthvakapalli@gmail.com

## 🙏 Acknowledgments

- **Material-UI** for the beautiful component library
- **Vercel** for seamless deployment platform
- **React Team** for the amazing framework
- **Express.js** for the robust backend framework

## 📞 Support

If you encounter any issues or have questions:

1. **Check the [Issues](../../issues)** section for existing solutions
2. **Create a new issue** with detailed description
3. **Contact the author** via email for urgent matters

---

**⭐ If you found this project helpful, please give it a star!**

**🔗 [Live Demo](https://22-b91-a6255.vercel.app/) | 📚 [Documentation](#) | 🐛 [Report Issues](../../issues)**
