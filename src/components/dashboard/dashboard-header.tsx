interface DashboardHeaderProps {
  title: string;
  description: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}