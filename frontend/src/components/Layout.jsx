import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip border-x border-slate-200 bg-white">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        topic="Mine Inundation & Water Irruption Dis..."
        isTrained={true}
      />

      {/* Page content */}
      <main className="flex min-h-0 flex-1 flex-col bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
