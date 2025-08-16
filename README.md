# Prescripto - Healthcare Appointment Management System

A comprehensive healthcare appointment management system built with React, Node.js, and MongoDB. Prescripto provides separate interfaces for patients, doctors, and administrators to manage medical appointments efficiently.

## 🏥 Features

### For Patients
- Browse and search for doctors by specialty
- Book appointments with preferred doctors
- View appointment history and status
- Manage personal profile and medical information
- Secure payment integration (Razorpay & Stripe)

### For Doctors
- Manage appointment schedules
- View patient information and medical history
- Update availability and profile
- Track earnings and appointment statistics

### For Administrators
- Manage doctor registrations and verifications
- Monitor all appointments across the system
- Oversee user accounts and system health
- Generate reports and analytics

## 🏗️ Project Structure

```
Prescripto/
├── frontend/          # Patient-facing React application
├── admin/            # Admin panel React application  
├── backend/          # Node.js/Express API server
```

### Frontend (Patient Portal)
- **Technology**: React 19, Vite, Tailwind CSS
- **Features**: Responsive design, modern UI components
- **Pages**: Home, Doctors, Appointments, Profile, About, Contact

### Admin Panel
- **Technology**: React 19, Vite, Tailwind CSS
- **Features**: Dashboard, Doctor management, Appointment oversight
- **Pages**: Dashboard, Add Doctor, Doctor List, All Appointments

### Backend API
- **Technology**: Node.js, Express.js, MongoDB
- **Features**: RESTful API, JWT authentication, file uploads
- **Services**: User management, appointment handling, payment processing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Cloudinary account (for image uploads)
- Razorpay/Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Prescripto
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install admin panel dependencies**
   ```bash
   cd ../admin
   npm install
   ```

### Environment Setup

Create `.env` files in the backend directory with the following variables:

```env
# Backend .env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run server
   ```
   The API will be available at `http://localhost:4000`

2. **Start the frontend (patient portal)**
   ```bash
   cd frontend
   npm run dev
   ```
   The patient portal will be available at `http://localhost:5173`

3. **Start the admin panel**
   ```bash
   cd admin
   npm run dev
   ```
   The admin panel will be available at `http://localhost:5174`

## 🛠️ Technologies Used

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Multer** - File upload middleware
- **Cloudinary** - Cloud image management
- **Razorpay/Stripe** - Payment gateways

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server with auto-restart
- **PostCSS** - CSS processing

## 📱 API Endpoints

### User Routes (`/api/user`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /appointments` - Book appointment
- `GET /appointments` - Get user appointments

### Doctor Routes (`/api/doctor`)
- `POST /register` - Doctor registration
- `POST /login` - Doctor authentication
- `GET /profile` - Get doctor profile
- `PUT /profile` - Update doctor profile
- `GET /appointments` - Get doctor appointments
- `PUT /appointments/:id` - Update appointment status

### Admin Routes (`/api/admin`)
- `POST /login` - Admin authentication
- `GET /doctors` - Get all doctors
- `POST /doctors` - Add new doctor
- `PUT /doctors/:id` - Update doctor status
- `GET /appointments` - Get all appointments

## 🔐 Authentication & Security

- JWT-based authentication for all user types
- Role-based access control (Patient, Doctor, Admin)
- Password hashing with bcrypt
- Secure file uploads with validation
- CORS enabled for cross-origin requests

## 💳 Payment Integration

- **Razorpay** - Primary payment gateway
- **Stripe** - Alternative payment gateway
- Secure payment processing
- Transaction history tracking

## 📁 File Upload

- Image uploads handled by Cloudinary
- Support for profile pictures and medical documents
- Automatic image optimization and CDN delivery

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to services like Heroku, Railway, or DigitalOcean
3. Ensure MongoDB connection is accessible

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `dist` folder to services like Vercel, Netlify, or GitHub Pages

### Admin Panel Deployment
1. Build the production version: `npm run build`
2. Deploy the `dist` folder to your preferred hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

## 🔮 Future Enhancements

- Video consultation integration
- Prescription management system
- Medical records management
- Mobile applications (iOS/Android)
- AI-powered symptom checker
- Integration with medical devices
- Multi-language support

---

**Prescripto** - Revolutionizing healthcare appointment management with modern technology and user-friendly interfaces.
