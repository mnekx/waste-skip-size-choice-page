// FilterSummary.tsx
import formatFilterKey from "../utils/filtering";
import type { FiltersType } from "../types/FiltersType";

type FilterSummaryProps = {
  activeFilters: [keyof FiltersType, boolean][];
  onRemoveFilter: (key: keyof FiltersType) => void;
};

export default function FilterSummary({
  activeFilters,
  onRemoveFilter,
}: FilterSummaryProps) {
  if (activeFilters.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {activeFilters.map(([key]) => (
        <span
          key={key}
          className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
        >
          {formatFilterKey(key)}
          <button
            onClick={() => onRemoveFilter(key)}
            className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none cursor-p"
            aria-label={`Remove ${key} filter`}
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  );
}
