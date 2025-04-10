# 🌟 Welcome to ReNew! 🌟

ReNew is your go-to platform for buying and selling secondhand products. Whether you're looking to declutter your home or find a hidden gem, ReNew has you covered. 🌍♻️

## 🚀 Live Demo (Hosted at vercel)

Check out the app live at: [https://renew-eta.vercel.app/](https://renew-eta.vercel.app/)

---

## 🛠️ Features

ReNew is built with love and React! Here's what makes it awesome:

### ⚛️ React Goodies
- **React Hooks**: Leveraging hooks like `useState`, `useEffect`, and custom hooks for clean and reusable logic.
- **Context API**: Centralized state management for user authentication and global app state.
- **Stateless and Stateful Components**: A perfect mix of components for dynamic and static content.
- **Bound Forms**: Fully controlled forms for seamless user input handling.
- **Synthetic Events**: Handling user interactions with React's event system.
- **Component Lifecycle**: Managing component mount, update, and unmount for optimal performance.

### 🏗️ Component-Oriented Architecture
The folder structure is **component-oriented**, making the codebase clean, modular, and easy to maintain. Shared components like buttons, navigation bars, footers, and carousels are reused across the app for consistency and simplicity.

### 🧩 Shared Components
- **Button**: A reusable button component with customizable styles and actions.
- **Navbar**: A responsive navigation bar with desktop and mobile support.
- **Footer**: A footer with links, contact info, and social media icons.
- **Infinite Carousel**: A dynamic carousel showcasing the latest products.
- **Product Grid**: A grid layout for displaying products beautifully.
- **Profile Header**: A detailed header for user profiles.

---

## 🗂️ Folder Structure

The app's folder structure is designed for scalability and readability:

```
src/
├── components/
│   ├── pages/          # Page-specific components (e.g., Login, Register, Offers)
│   ├── shared/         # Reusable components (e.g., Button, Navbar, Footer)
├── context/            # Context API for global state management
├── hooks/              # Custom React hooks for reusable logic
├── utils/              # Utility functions (e.g., API requests, message handlers)
├── App.jsx             # Main app component
├── index.jsx           # Entry point
```

---

## 🌟 Key Features in Detail

### 🛒 Offers
- Browse all offers or filter by category (e.g., Electronics, Furniture, Clothing).
- View detailed product pages with seller information and contact options.
- Save offers to your profile for later viewing.

### 👤 User Profiles
- View your profile or other users' profiles.
- Edit your profile with bound forms for name, phone, and profile picture.
- Delete your profile (with a confirmation prompt).

### ✨ Create and Edit Offers
- Create new offers with a simple, bound form.
- Edit existing offers with pre-filled data.
- Validation ensures product names and prices are valid.

### 💾 Saved Offers
- Save offers to your profile with a single click.
- View all your saved offers in one place.

### 🔒 Authentication
- Register with email, password, and additional details like name and phone.
- Login securely and access your personalized dashboard.
- Logout with a single click.

### 📍 Location Page
- View the location of ReNew offices in Sofia, Plovdiv, and Varna.
- Select a city from a dropdown menu to dynamically update the map.
- The map is powered by the **Google Maps API**, providing an interactive and accurate view of office locations.
- A custom React hook (`useCityMap`) is used to encapsulate the logic for rendering the map and markers, ensuring clean and reusable code.

---

## 🏃 How to Run Locally

Follow these steps to run the project on your local machine:

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- Firebase project setup (for Firestore and Authentication)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/renew.git
   cd renew
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in Browser**:
   Visit [http://localhost:5173](http://localhost:5173) to view the app.


---

## 🧑‍💻 Developer Notes

### React Hooks
Custom hooks like `useOffers`, `useAuth`, and `useErrorHandler` encapsulate logic for fetching data, managing authentication, and handling errors.

### Context API
The `UserContext` provides global state for user authentication, making it accessible across the app.

### Lifecycle Management
Components like `InfiniteCarousel` and `Offers` use lifecycle hooks (`useEffect`) to fetch data and handle cleanup.

### Synthetic Events
Forms and buttons use React's synthetic event system for smooth user interactions.

---

## 🎨 Design Philosophy

ReNew's design prioritizes:
- **Reusability**: Shared components reduce redundancy.
- **Scalability**: Component-oriented architecture supports future growth.
- **User Experience**: Clean UI with responsive design for all devices.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, CSS Modules
- **Backend**: Firebase (Firestore, Authentication)
- **Hosting**: Vercel
- **Google Maps API**: Used to display interactive maps with markers for office locations.

---

## 👏 Contributing

Feel free to fork the repo, submit pull requests, or report issues. Let's make ReNew even better together!

---

