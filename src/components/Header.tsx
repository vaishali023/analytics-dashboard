import { useState } from "react";
import { ChainSelector } from "./ChainSelector";
import { Sun, MoonStar } from "lucide-react";

export const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 dark:text-white shadow-md">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      <div className="flex items-center gap-4">
        <ChainSelector />
        <div
          className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all ${
            isDarkMode ? "bg-gray-800 shadow-inner" : "bg-gray-300 shadow-md"
          }`}
          onClick={toggleDarkMode}
        >
          <div
            className={`absolute inset-0 rounded-full transition-all ${
              isDarkMode
                ? "shadow-[inset_0_0_15px_rgba(255,255,255,0.3)]"
                : "shadow-[0_0_10px_rgba(0,0,0,0.2)]"
            }`}
          ></div>
          <div
            className={`relative z-10 w-6 h-6 rounded-full bg-white shadow-md transition-all transform ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {isDarkMode ? (
              <MoonStar className="w-4 h-4 text-yellow-400 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
            ) : (
              <Sun className="w-4 h-4 text-orange-500 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
