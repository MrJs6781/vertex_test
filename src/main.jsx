import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Connect from "./pages/Connect.jsx";
import Dealroom from "./pages/Dealroom.jsx";
import Analytics from "./pages/Analytics.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Root layout component
    children: [
      { path: "/", element: <Dashboard /> }, // Dashboard page
      { path: "/connect", element: <Connect /> }, // Connect page
      { path: "/dealroom", element: <Dealroom /> }, // Dealroom page
      { path: "/analytics", element: <Analytics /> }, // Analytics page
      { path: "/profile", element: <Profile /> }, // Profile page
      { path: "/settings", element: <Settings /> }, // Settings page
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
