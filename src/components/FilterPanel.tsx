import { useState } from "react";

import type { FiltersType } from "../types/FiltersType";

type FilterPanelProps = {
	filters: FiltersType;
	onChange: (key: keyof FiltersType) => void;
	onClear: () => void;
};

export default function FilterPanel({
	filters,
	onChange,
	onClear,
}: FilterPanelProps) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<section className="bg-white border p-4 rounded shadow-sm mb-6 max-w-md">
			<h2 className="text-lg font-semibold mb-3">Filter Skips</h2>
			<button
				className="font-semibold text-blue-600 mb-2"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				{isOpen ? "Hide Filters" : "Show Filters"}
			</button>
			{isOpen && (
				<form className="space-y-2">
					<label
						htmlFor="allowed-on-road"
						className="flex items-center space-x-2"
					>
						<input
							id="allowed-on-road"
							type="checkbox"
							checked={filters.allowedOnRoad}
							onChange={() => onChange("allowedOnRoad")}
							className="form-checkbox"
						/>
						<span>Allowed on Road</span>
					</label>
					<label
						htmlFor="allowed-heavy-waste"
						className="flex items-center space-x-2"
					>
						<input
							id="allowed-heavy-waste"
							type="checkbox"
							checked={filters.allowsHeavyWaste}
							onChange={() => onChange("allowsHeavyWaste")}
							className="form-checkbox"
						/>
						<span>Allows Heavy Waste</span>
					</label>
					<label className="flex items-center space-x-2">
						<input
							id="size-8"
							type="checkbox"
							checked={filters.size8}
							onChange={() => onChange("size8")}
						/>
						<span>8 Yard</span>
					</label>
					<label className="flex items-center space-x-2">
						<input
							id="size-12"
							type="checkbox"
							checked={filters.size12}
							onChange={() => onChange("size12")}
						/>
						<span>12 Yard</span>
					</label>
					<label className="flex items-center space-x-2">
						<input
							id="hire-period-14"
							type="checkbox"
							checked={filters.hirePeriod14}
							onChange={() => onChange("hirePeriod14")}
						/>
						<span>14 Days Hire</span>
					</label>
					<button
						className="text-sm text-blue-600 underline mt-2"
						onClick={() => onClear()}
					>
						Clear All
					</button>
				</form>
			)}
		</section>
	);
}
