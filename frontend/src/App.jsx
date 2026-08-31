

import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [view, setView] = useState("landing"); // "landing" | "dashboard"

  return (
    <div>
      {view === "landing" ? (
        <LandingPage onExplore={() => setView("dashboard")} />
      ) : (
        <Dashboard onBack={() => setView("landing")} />
      )}
    </div>
  );
}