# GG-APP – Anonymous Gossip & Q/A Web Application

A modern, interactive, anonymous gossip-sharing and Q&A platform inspired by *Gossip Girl* and *Quora*.  
Built with **ReactJS**, **Node.js / Express**, and **MongoDB Atlas**, the application allows users to:

✨ Post gossips anonymously  
✨ Upload optional images  
✨ Ask questions & get anonymous replies  
✨ Comment anonymously on posts  
✨ Secure login/registration  
✨ Admin moderation (optional future module)

All interactions remain **anonymous** to other users, while authentication ensures platform security.

---

## 🚀 Features

### 🧑‍💻 User Features
- Register & Login using secure JWT authentication  
- Create gossip posts with text + image upload  
- View all posts (sorted by most recent)  
- Add anonymous comments to any post  
- Ask questions & reply instantly  
- Logout functionality  
- Protected pages (Home, Ask, Post, Comments)

### 🔐 Admin Features *(optional / future enhancement)*  
- Approve posts  
- Delete inappropriate posts  
- Monitor questions and comments

---

## 🛠️ Tech Stack

### Frontend
- ReactJS  
- React Router  
- Axios  
- Bootstrap  
- Custom CSS (Pink + Grey Gossip Theme)

### Backend
- Node.js  
- Express.js  
- Multer (Image Uploads)  
- MongoDB Atlas  
- Mongoose  
- JWT Authentication  
- bcryptjs

---

## 📁 Project Structure

GGAPP/
│
├── ggapp-frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── styles/
│ │ └── assets/
│ └── package.json
│
└── ggapp-backend/
├── models/
├── routes/
├── middleware/
├── uploads/
├── server.js
└── package.json


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ggapp.git
```

### 2️⃣ Backend Setup
```bash
cd ggapp
```
```bash
npm install
```
Create a *.env* file
```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```
Start backend
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd ggapp-frontend
```

```bash
npm install
```

```bash
npm start
```

#Output

![WhatsApp Image 2025-11-14 at 17 59 12_86811630](https://github.com/user-attachments/assets/0c6f266a-1c2e-49cb-88ef-dbbb8d76c570)

![WhatsApp Image 2025-11-14 at 17 59 12_d2c09fc3](https://github.com/user-attachments/assets/ca568f66-16b1-426b-82ec-fcf5625e158e)


