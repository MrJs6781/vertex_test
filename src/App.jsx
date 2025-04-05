import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SidebarUsers from "./components/Sidebar-users";
import SidebarPages from "./components/Sidebar-pages";
import MobileSidebar from "./components/MobileSidebar";

function App() {
  return (
    <section className="w-full min-h-screen flex flex-col items-start bg-black pb-16 lg:pb-0">
      <Navbar />
      {/* Mobile Sidebar (visible only on mobile) */}
      <MobileSidebar />

      <div className="w-full h-full min-h-screen flex items-start">
        {/* Hidden on mobile and tablet */}
        <div className="hidden lg:block">
          <SidebarUsers />
        </div>
        <div className="hidden lg:block">
          <SidebarPages />
        </div>
        <div className="w-full lg:grow h-full flex flex-col items-start justify-start">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default App;
