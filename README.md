# 🚀 LaunchBase Ecommerce Starter Template

A modern, full-stack, and visually stunning Ecommerce Store Starter Template built with Next.js, MongoDB, and TailwindCSS. Designed for developers who want a high-end foundation for their next project.

## ✨ Features

- **Futuristic UI**: Glassmorphism, smooth animations, and premium dark theme.
- **Full-Stack Logic**: Complete backend with Next.js API Routes and MongoDB.
- **Authentication**: JWT-based secure auth flow (Signup, Login, Logout).
- **Product Management**: Full CRUD functionality for products with an Admin dashboard.
- **Image Uploads**: Seamless integration with Cloudinary for product images.
- **Responsive Design**: Mobile-first, pixel-perfect layout for all screen sizes.
- **Developer Friendly**: Clean code with detailed 3-5 word comments.

## 🛠️ Tech Stack

- **Frontend**: Next.js (Pages Router), TailwindCSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js API Routes, JWT, Bcrypt.js.
- **Database**: MongoDB (Mongoose).
- **Storage**: Cloudinary.

## 🚀 Getting Started

### 1. Prerequisite
- Node.js installed
- MongoDB URI (Atlas or local)
- Cloudinary account

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add the following:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `/components`: Reusable UI components.
- `/pages`: Frontend pages and API routes.
- `/models`: Mongoose database models.
- `/lib`: Database and auth utilities.
- `/styles`: Global CSS and theme tokens.

## 📦 Deployment
Deploy easily on **Vercel**:
1. Push your code to GitHub.
2. Connect your repo to Vercel.
3. Add environment variables in the Vercel dashboard.
4. Deploy!

## 📝 License
MIT License - Feel free to use this template for your personal or commercial projects.

---
Built with ❤️ for the LaunchBase ecosystem.
