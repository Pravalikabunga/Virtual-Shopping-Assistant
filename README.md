# Virtual Shopping Assistant

A full-stack web application that provides AI-powered shopping recommendations and product advice using Google's Generative AI (Gemini).

## Demo Link 
![Demo Link for Project](https://virtual-shopping-assistant-pravalikas-projects-551cce70.vercel.app/)       


## Features

- 🤖 *AI-Powered Shopping Assistant*: Get personalized product recommendations and shopping advice
- 🔐 *User Authentication*: Secure registration and login system with JWT
- 👤 *User Profiles*: Personal user accounts with customized experiences
- 👑 *Admin Dashboard*: Complete user management system with role-based access control
- 📱 *Responsive Design*: Beautiful UI that works on both desktop and mobile devices

## Tech Stack

### Backend
- Node.js & Express
- MongoDB (Database)
- JWT Authentication
- Google Gemini API

### Frontend
- React
- Material-UI
- React Router v6
- Context API for state management

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas account)
- [Git](https://git-scm.com/)

## Getting Started

### Clone the Repository

bash
git clone https://github.com/Pravalikabunga/Virtual-Shopping-Assistant.git
cd virtual-shopping-assistant


### Backend Setup

1. Navigate to the backend directory:
   bash
   cd backend
   

2. Install dependencies:
   bash
   npm install
   

3. Create a .env file in the backend directory with the following variables:
   
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/shopping-assistant
   JWT_SECRET=your_jwt_secret_key_here
   GOOGLE_API_KEY=your_gemini_api_key_here
   

4. Start the backend server:
   bash
   npm run dev
   
   The backend server will run on http://localhost:3000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   bash
   cd frontend
   

2. Install dependencies:
   bash
   npm install
   

3. Start the frontend development server:
   bash
   npm start
   
   The frontend will run on http://localhost:3001

## Initial Admin Setup

To create an admin user:

1. Register a regular user through the application's registration page
2. Connect to your MongoDB database
3. Update the user's role to "admin".


## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
- GET /api/auth/profile - Get current user profile

### Shopping Assistant

- POST /api/shopping/assist - Get shopping recommendations
- POST /api/shopping/assist/enhanced - Get personalized recommendations

### Admin

- GET /api/admin/users - Get all users (admin only)
- PATCH /api/admin/users/:id - Update user (admin only)
- DELETE /api/admin/users/:id - Delete user (admin only)
- GET /api/admin/stats - Get system statistics (admin only)


## Acknowledgments

- [Google Gemini API](https://ai.google.dev/) for AI-powered shopping recommendations
- [Material-UI](https://mui.com/) for the responsive UI components
- [Express.js](https://expressjs.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for the database
- [React](https://reactjs.org/) for the frontend library
