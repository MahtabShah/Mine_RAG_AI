import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import AskModel from "./pages/AskModel";
import InundationDashboard from "./pages/KnowledgeBase";
import Header from "./components/Header";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const [activeTab, setActiveTab] = useState("chat");
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-clip border-x border-slate-200 bg-white">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          topic="Mine Inundation & Water Irruption Dis..."
          isTrained={true}
        />

        <main className="flex min-h-0 flex-1 p-2 flex-col bg-slate-50">
          {activeTab == "chat" && <AskModel />}
          {activeTab == "knowledge" && <InundationDashboard />}
        </main>
      </div>
    </>
  );
}
