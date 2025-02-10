interface CardProps {
  title: string;
  value: string | number;
  description: string;
}

export const Card: React.FC<CardProps> = ({ title, value, description }) => {
  return (
    <div className="p-4 bg-white border border-gray-500 dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="text-2xl font-bold mt-2 text-blue-500">{value}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};
