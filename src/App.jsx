import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SidebarUsers from "./components/Sidebar-users";

function App() {
  return (
    <section className="w-full min-h-screen flex flex-col items-start bg-black">
      <Navbar />
      <div className="w-full h-auto flex items-start">
        <SidebarUsers />
        <Outlet />
      </div>
    </section>
  );
}

export default App;
