# 🎓 Scholar Grant – Your Global Scholarship Gateway

Scholar Grant is a MERN-based web application designed to **empower students worldwide** by simplifying the complex journey of discovering and applying for scholarships at top universities across the globe.

## 🌍 Vision

> At Scholar Grants, we believe **financial barriers should never limit educational dreams**. We’re committed to connecting talented individuals with the funding opportunities they need to reach their full potential.

---

## 🚀 Features

- 🔍 **Search & Filter Scholarships** – Discover funding options tailored to your academic goals.
- 📝 **Apply Seamlessly** – Intuitive forms to apply directly for scholarships.
- 📊 **Real-Time Dashboard** – Manage applications and track progress.
- 🔒 **User Authentication** – Secure login with Firebase Auth.
- 💸 **Stripe Payments** – Handle any payment-related functionality smoothly.
- 📱 **Responsive Design** – Fully mobile-ready and beautifully styled with TailwindCSS and DaisyUI.
- ⚡ **Performance Optimized** – Smooth UX with `react-query`, `nprogress`, and lazy loading.
- 🔔 **Notifications** – Instant feedback with `react-toastify` and `sweetalert2`.

---

## 🛠️ Tech Stack

### 🧩 Frontend
- **React 19**
- **React Router v7**
- **Tailwind CSS 4** + DaisyUI
- **Stripe Integration** – `@stripe/react-stripe-js`, `@stripe/stripe-js`
- **Firebase** – Authentication & Firestore
- **React Query** – Efficient data fetching & caching
- **Swiper.js** – Interactive sliders
- **React CountUp** – Animated counters
- **React Awesome Reveal** – Scroll animations

### 📦 Other Packages
- `axios` – HTTP requests
- `nprogress` – Page load progress bar
- `sweetalert2` – Confirmation dialogs
- `react-toastify` – Toast notifications
- `react-intersection-observer` – Lazy loading and animation triggers

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/scholar-grant.git
cd scholar-grant
```

# Install Dependencies
``` bash
npm install
```

# Configure Environment Variables
## Create a `.env` file in the root of your project with:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxxx
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# Start the App
```bash
npm run dev
```

