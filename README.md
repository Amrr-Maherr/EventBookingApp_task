# 📱 EventBookingApp

**EventBookingApp** is a mobile application built with **React Native (Expo)** that allows users to **browse, register, and manage events** easily.  
It features user authentication with **Firebase**, smooth navigation using **Expo Router**, and global state management powered by **Redux Toolkit**.

---

## 🚀 Features

- 🔐 **Firebase Authentication** (Register, Login, Logout)  
- 🗂️ **Redux Toolkit** for state management (events, favorites, details)  
- 🧭 **Expo Router** for seamless navigation  
- 💾 **AsyncStorage** to persist user data locally  
- 📱 **Responsive UI** built with modern React Native components  
- 🎟️ **Event Details & History** screens  
- ❤️ **Add to Favorites** functionality  
- 🧭 **Profile Screen** with Firebase Logout integration  

---

## 🏗️ Backend & Data

- **Events data** are fetched from [MockAPI](https://mockapi.io/) using the endpoint:  
  `https://68f8b804deff18f212b739d5.mockapi.io/api/v1/events`  
- **Firebase Authentication** is used for user registration and login because MockAPI's free plan does not support full authentication endpoints.

---

## 🏗️ Project Structure

```
📁 EventBookingApp
├── 📁 Providers            # App-wide context providers
├── 📁 Store                # Redux slices and store setup
├── 📁 app                  # Screens & navigation structure (Expo Router)
│   ├── (tabs)              # Tab screens: Home, History, Profile
│   ├── event/[id].tsx      # Dynamic route for event details
│   ├── Login.tsx           # Firebase login screen
│   ├── Register.tsx        # Firebase register screen
│   └── modal.tsx
├── 📁 assets               # App images and icons
├── 📁 components           # Reusable UI components (cards, loaders, etc.)
├── 📁 constants            # Theme and app constants
├── 📁 hooks                # Custom React hooks
├── 📁 scripts              # Utility scripts (e.g., reset project)
├── ⚙️ firebaseConfig.js    # Firebase app configuration
├── ⚙️ app.json
├── ⚙️ package.json
├── ⚙️ tsconfig.json
└── 📝 README.md
```

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | **React Native (Expo)** |
| Navigation | **Expo Router** |
| State Management | **Redux Toolkit** |
| Backend | **MockAPI** (events) + **Firebase Authentication** |
| Storage | **AsyncStorage** |
| UI | **React Native + Vector Icons** |
| Language | **TypeScript** |

---

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/EventBookingApp.git
   cd EventBookingApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npx expo start
   ```

4. **Run on Android emulator**
   ```bash
   npm run android
   ```

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)  
2. Create a new project and enable **Email/Password Authentication**  
3. Copy your Firebase config and paste it inside:
   ```js
   // firebaseConfig.js
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   ```

---

## 🧠 Redux Store Overview

| Slice | Responsibility |
|--------|----------------|
| **EventsSlice.tsx** | Handles fetching and storing all events from MockAPI endpoint |
| **FavSlice.tsx** | Manages favorite events |
| **eventDetailsSlice.tsx** | Stores detailed event info |
| **Store.tsx** | Central Redux store setup |

---

## 🧑‍💻 Author

**👤 Amr Maher Ali**  
Frontend Developer specializing in **React, React Native, and Next.js**

📧 **Email:** [amrr.maherr24@gmail.com](mailto:amrr.maherr24@gmail.com)  
🔗 **LinkedIn:** [linkedin.com/in/Amrr-Maherr](https://www.linkedin.com/in/Amrr-Maherr)  
🌐 **Portfolio:** [amrr-maherr.github.io](https://amrr-maherr.github.io)

---

## 🏁 License
This project is licensed under the **MIT License** – free to use and modify.

---

> 📅 *Generated on October 23, 2025*  
> ⚙️ *Expo + Firebase + Redux + MockAPI Integration by Amr Maher*
