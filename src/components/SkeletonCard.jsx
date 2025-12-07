export default function SkeletonCard() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 h-56 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}
