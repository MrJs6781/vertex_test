import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SidebarUsers from "./components/Sidebar-users";
import SidebarPages from "./components/Sidebar-pages";

function App() {
  return (
    <section className="w-full min-h-screen flex flex-col items-start bg-black">
      <Navbar />
      <div className="w-full h-full min-h-screen flex items-start">
        <SidebarUsers />
        <SidebarPages />
        <div className="grow h-full flex flex-col items-start justify-start">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default App;
