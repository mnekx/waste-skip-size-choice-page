// Header.tsx
import { Filter } from "lucide-react";
import FilterPanel from "../components/FilterPanel";
import type { FiltersType } from "../types/FiltersType";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRef, type Dispatch, type SetStateAction } from "react";

type HeaderProps = {
	showFilters: boolean;
	setShowFilters: Dispatch<SetStateAction<boolean>>;
	filters: FiltersType;
	onFilterChange: (key: keyof FiltersType) => void;
	onClearFilters: () => void;
};

export default function Header({
	showFilters,
	setShowFilters,
	filters,
	onFilterChange,
	onClearFilters,
}: HeaderProps) {
	const filterRef = useRef<HTMLDivElement>(null);
	useClickOutside(filterRef, () => setShowFilters(false));

	return (
		<div className="relative flex items-center">
			<h1 className="text-2xl font-bold">Choose Your Skip Size</h1>
			<div className="z-20 inline-block left-4">
				<button
					onClick={() => setShowFilters(!showFilters)}
					className="bg-blue-600 text-white p-2 m-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none"
					aria-label="Toggle filters"
				>
					<Filter className="w-5 h-5" />
				</button>

				{showFilters && (
					<div
						ref={filterRef}
						className="absolute left-0 sm:left-[25%] mt-2 w-[90vw] max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg"
					>
						<FilterPanel
							filters={filters}
							onChange={onFilterChange}
							onClear={onClearFilters}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
