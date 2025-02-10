interface CardProps {
  title: string;
  value: string | number;
  description: string;
}

export const Card: React.FC<CardProps> = ({ title, value, description }) => {
  return (
    <div
      className="relative bg-white dark:bg-[#0A0A0A] p-6 rounded-2xl border border-gray-300 dark:border-[#222]
      shadow-md transition-all duration-700 ease-in-out 
      hover:shadow-[0_0_15px_rgba(255,255,255,0.15),0_0_10px_rgba(111,65,210,0.5)] hover:scale-[1.03]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#6F41D2]/10 via-transparent to-[#6F41D2]/10 opacity-0 hover:opacity-20 transition-all duration-500 rounded-2xl"></div>

      <h2 className="text-lg font-semibold text-[#4B5563] dark:text-white">
        {title}
      </h2>
      <p className="text-2xl font-bold text-gray-900  dark:text-[#D4C2FF]">
        {value}
      </p>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};
