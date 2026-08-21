// import React, { useState } from "react";
// import LandingPage from "./components/LandingPage";

// export default function App() {
//   const [view, setView] = useState("landing"); // "landing" | "dashboard"

//   if (view === "landing") {
//     return <LandingPage onExplore={() => setView("dashboard")} />;
//   }

//   return (
//     <div className="min-h-screen bg-background text-on-surface p-8">
//       <div className="max-w-container-max mx-auto">
//         <button
//           onClick={() => setView("landing")}
//           className="text-sm font-semibold text-primary underline mb-6 cursor-pointer"
//         >
//           ← Back to Overview
//         </button>
//         <h2 className="text-2xl font-bold font-headline">Dashboard Placeholder</h2>
//       </div>
//     </div>
//   );
// }

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