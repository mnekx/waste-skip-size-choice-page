import type { FiltersType } from "../types/FiltersType";
import { CheckCircle, Trash2, Weight } from "lucide-react";

interface FilterPanelProps {
	filters: FiltersType;
	onChange: (key: keyof FiltersType) => void;
	onClear: () => void;
}

export default function FilterPanel({
	filters,
	onChange,
	onClear,
}: FilterPanelProps) {
	return (
		<div className="p-4 sm:p-5 space-y-4 text-sm text-gray-700 w-[100%] sm:w-[100vw] sm:max-w-sm sm:absolute sm:left-1/2 sm:-translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-20 overflow-hidden">
			{/* Road & Waste */}
			<div>
				<h3 className="text-sm font-semibold mb-2">Road & Waste Options</h3>
				<div className="grid grid-cols-2 gap-2">
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={filters.allowedOnRoad}
							onChange={() => onChange("allowedOnRoad")}
							className="accent-blue-600"
						/>
						<CheckCircle className="w-4 h-4 text-blue-500" /> Allowed on Road
					</label>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={filters.allowsHeavyWaste}
							onChange={() => onChange("allowsHeavyWaste")}
							className="accent-blue-600"
						/>
						<Weight className="w-4 h-4 text-purple-500" /> Heavy Waste
					</label>
				</div>
			</div>

			{/* Size Filters */}
			<div>
				<h3 className="text-sm font-semibold mb-2">Size</h3>
				<div className="grid grid-cols-2 gap-2">
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={filters.size8}
							onChange={() => onChange("size8")}
							className="accent-blue-600"
						/>
						8 Yard
					</label>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={filters.size12}
							onChange={() => onChange("size12")}
							className="accent-blue-600"
						/>
						12 Yard
					</label>
				</div>
			</div>

			{/* Hire Period */}
			<div>
				<h3 className="text-sm font-semibold mb-2">Hire Period</h3>
				<label className="flex items-center gap-2">
					<input
						type="checkbox"
						checked={filters.hirePeriod14}
						onChange={() => onChange("hirePeriod14")}
						className="accent-blue-600"
					/>
					14 Days
				</label>
			</div>

			{/* Clear Button */}
			<div className="flex justify-between pt-2 border-t mt-2">
				<button
					onClick={onClear}
					className="flex items-center gap-1 cursor-pointer text-gray-500 hover:text-red-600 hover:underline text-sm"
				>
					<Trash2 className="w-4 h-4" /> Clear All
				</button>
			</div>
		</div>
	);
}
