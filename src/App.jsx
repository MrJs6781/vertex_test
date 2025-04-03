import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <section className="w-full h-screen flex flex-col items-start bg-black">
      <Navbar />
      <Outlet /> {/* Child routes render here */}
    </section>
  );
}

export default App;
