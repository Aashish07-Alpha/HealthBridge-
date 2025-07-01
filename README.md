# Doctor Appointment Booking System

A modern full-stack web application designed to streamline doctor appointment scheduling and management. It offers a user-friendly interface, secure payment integration, and role-based access for patients, doctors, and administrators. Built with React.js, Node.js, and MongoDB/MySQL, it ensures scalability, data security, and efficiency for healthcare services.

## 🚀 Live Demo

https://healthbridge-frontend-cjru.onrender.com/

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)

## ✨ Features

### For Patients
- User Registration & Authentication - Secure signup/login system
- **Doctor Search** - Find doctors by specialty, location, or name
- **Appointment Booking** - Schedule appointments with available time slots
- **Appointment Management** - View, reschedule, or cancel appointments
- **Profile Management** - Update personal information and medical history
- **Appointment Reminders** - Email/SMS notifications for upcoming appointments

### For Doctors
- **Doctor Dashboard** - Comprehensive overview of appointments
- **Schedule Management** - Set availability and manage time slots
- **Patient Records** - Access patient information and appointment history
- **Appointment Notifications** - Real-time updates on new bookings

### For Administrators
- **Admin Panel** - Manage doctors, patients, and system settings
- **Analytics Dashboard** - Track appointment statistics and system usage
- **User Management** - Add/remove doctors and manage user permissions

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 
- **Styling**: CSS3 / Tailwind CSS 
- **State Management**:  Context API
- **HTTP Client**: Axios / Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 
- **Database**: MongoDB 
- **Authentication**: JWT 
- **File Upload**: Multer / Cloudinary

### Additional Tools
- **Payment Integration**: Razorpay
- **Deployment**: Render

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Database (MongoDB)

### Clone Repository
```bash
git clone https://github.com/yourusername/doctor-appointment-booking.git
cd doctor-appointment-booking
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env

# Configure your environment variables
# DATABASE_URL=your_database_connection_string
# JWT_SECRET=your_jwt_secret
# EMAIL_SERVICE_API_KEY=your_email_service_key

# Run database migrations (if applicable)
npm run migrate

# Start the server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env

# Configure API base URL
# REACT_APP_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```
### Admin Setup
```bash
# Navigate to frontend directory
cd admin

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env

# Configure API base URL
# REACT_APP_API_URL=http://localhost:5000/api

# Start the development server
npm run dev

## 🎯 Usage

### For Patients
1. **Register/Login** - Create an account or log in to existing account
2. **Search Doctors** - Use filters to find the right healthcare provider
3. **Book Appointment** - Select available time slots and confirm booking
4. **Manage Appointments** - View upcoming appointments in your dashboard

### For Doctors
1. **Complete Profile** - Add specialization, experience, and availability
2. **Set Schedule** - Define working hours and available time slots
3. **Manage Appointments** - Accept, reschedule, or cancel appointments
4. **Patient Communication** - Send messages or updates to patients

## 📱 Screenshots

### Patient Dashboard
![Patient Dashboard](screenshots/patient-dashboard.png)

### Doctor Profile
![Doctor Profile](screenshots/doctor-profile.png)

### Appointment Booking
![Appointment Booking](screenshots/appointment-booking.png)

### Admin Panel
![Admin Panel](screenshots/admin-panel.png)

## 🌟 Key Features Implemented

- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Notifications** - Instant updates for appointment changes
- **Secure Authentication** - JWT-based authentication system
- **Data Validation** - Comprehensive input validation on both frontend and backend
- **Error Handling** - Graceful error handling with user-friendly messages
- **Performance Optimization** - Lazy loading and code splitting implemented

## 🚀 Deployment

### Environment Variables
Make sure to set the following environment variables in your production environment:

```env
# Database
DATABASE_URL=your_production_database_url

# JWT
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRES_IN=7d

# Email Service
EMAIL_SERVICE_API_KEY=your_email_service_key
EMAIL_FROM=noreply@yourdomain.com

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.com
```

### Build Commands
```bash
# Build frontend
cd frontend && npm run build

# Start production server
cd backend && npm start
```


## 📋 Future Enhancements

- [ ] Integration with hospital management systems
- [ ] Telemedicine/video consultation feature
- [ ] Multi-language support
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Integration with wearable devices

- **Developer Name** - [Aashish VIkas Suryawanshi]
- **Contact** - aashish.22310410@viit.ac.in



⭐ If you found this project helpful, please give it a star on GitHub!
