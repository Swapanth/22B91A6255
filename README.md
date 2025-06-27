# URL Shortener

A simple web application to shorten long URLs with custom expiry times and analytics.

## Live Demo
🚀 **[https://22-b91-a6255.vercel.app/](https://22-b91-a6255.vercel.app/)**

## Features
- Shorten long URLs
- Set custom expiry times
- Create custom short codes
- View click statistics
- Copy links with one click
- Mobile-friendly design

## Tech Stack
- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Deployment**: Vercel

## Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd 22B91A6255
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm start
```

### 4. Environment Variables
Create `.env` in the client folder:
```
REACT_APP_SERVER_PORT=http://localhost:7000
```

## How to Use
1. Enter a long URL
2. Optionally set expiry time (in minutes)
3. Optionally create a custom short code
4. Click "Shorten URL"
5. Copy and share your short link

## API Endpoints
- `POST /` - Shorten a URL
- `GET /:shortcode` - Redirect to original URL
- `GET /log/stats` - Get statistics

## Author
**Vakapalli H V Sai Surya Swapanth**  
Roll No: 22B91A6255