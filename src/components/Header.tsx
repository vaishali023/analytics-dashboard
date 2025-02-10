import { useEffect, useState } from "react";
import { ChainSelector } from "./ChainSelector";
import { Sun, MoonStar } from "lucide-react";

export const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDashboard(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className="flex items-center justify-between px-6 py-4 mb-10
     bg-white dark:bg-header-dark text-gray-900 dark:text-gray-200 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-3d-dark border-b  dark:border-darkBorder"
    >
      <div
        className="flex items-baseline space-x-2 cursor-pointer transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1
          className={`text-2xl font-bold ${
            isHovered ? "text-[#6F41D2]" : "text-gray-900 dark:text-gray-200"
          } transition-colors duration-300`}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Analytics
        </h1>
        <h1
          className={`text-2xl font-bold ${
            isHovered ? "text-[#6F41D2]" : "text-gray-900 dark:text-gray-200"
          } transition-all duration-700 ${
            showDashboard
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-5"
          }`}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Dashboard
        </h1>
      </div>
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
                : "shadow-[0_0_2px_rgba(0,0,0,0.2)]"
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
