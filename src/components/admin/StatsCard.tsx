
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  color: "blue" | "green" | "yellow" | "red" | "purple";
}

export function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
      case "green":
        return "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400";
      case "yellow":
        return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400";
      case "red":
        return "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400";
      case "purple":
        return "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400";
      default:
        return "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className={`p-2 rounded-lg ${getColorClasses()}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mb-2">
        <div className="text-2xl font-bold">{value}</div>
      </div>
      <div className={`text-sm ${change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
        {change >= 0 ? "+" : ""}{change}% desde o último mês
      </div>
    </div>
  );
}
