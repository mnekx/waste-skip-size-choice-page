interface EmptyStateProps {
  onClearFilters: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="mt-6 flex flex-col items-center justify-center animate-pulse space-y-3 text-center text-gray-500">
      <span className="text-3xl">😕</span>
      <div className="h-5 w-40 bg-gray-200 rounded" />
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <button
        onClick={onClearFilters}
        className="mt-2 text-blue-600 hover:underline text-sm animate-none"
      >
        Clear filters
      </button>
    </div>
  );
}
