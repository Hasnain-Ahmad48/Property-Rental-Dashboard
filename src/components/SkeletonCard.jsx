export default function SkeletonCard() {
    return (
        <div className="card overflow-hidden animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-56 w-full shimmer-bg" />
            <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 shimmer-bg" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 shimmer-bg" />
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded shimmer-bg" />
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 shimmer-bg" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 shimmer-bg" />
                </div>
            </div>
            <style jsx>{`
        .shimmer-bg {
          background: linear-gradient(
            90deg,
            currentColor 0%,
            rgba(255, 255, 255, 0.3) 50%,
            currentColor 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
        </div>
    );
}
