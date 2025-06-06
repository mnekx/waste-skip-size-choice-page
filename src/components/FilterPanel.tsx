type Filters = {
	allowedOnRoad: boolean;
	allowsHeavyWaste: boolean;
};

type FilterPanelProps = {
	filters: Filters;
	onChange: (key: keyof Filters) => void;
};

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
	return (
		<section className="bg-white border p-4 rounded shadow-sm mb-6 max-w-md">
			<h2 className="text-lg font-semibold mb-3">Filter Skips</h2>
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
			</form>
		</section>
	);
}
