import type { FiltersType } from "../types/FiltersType";
import type { SkipOption } from "../types/SkipOption";

const mockSkips: SkipOption[] = [
	{
		size: 8,
		hirePeriod: 14,
		transportCost: null,
		perTonneCost: null,
		priceB4VAT: 300,
		vat: 20,
		postCode: "NR32",
		area: "Lowestoft",
		forbidden: false,
		createdAt: "",
		updatedAt: "",
		allowedOnRoad: true,
		allowsHeavyWaste: false,
		imageUrl: "",
	},
	{
		size: 12,
		hirePeriod: 7,
		transportCost: null,
		perTonneCost: null,
		priceB4VAT: 500,
		vat: 20,
		postCode: "NR33",
		area: "Lowestoft",
		forbidden: false,
		createdAt: "",
		updatedAt: "",
		allowedOnRoad: false,
		allowsHeavyWaste: true,
		imageUrl: "",
	},
];

function filterSkips(skips: SkipOption[], filters: FiltersType): SkipOption[] {
	return skips.filter((s) => {
		if (filters.allowedOnRoad && !s.allowedOnRoad) return false;
		if (filters.allowsHeavyWaste && !s.allowsHeavyWaste) return false;

		const sizeFilters = [];
		if (filters.size8) sizeFilters.push(8);
		if (filters.size12) sizeFilters.push(12);
		if (sizeFilters.length && !sizeFilters.includes(s.size)) return false;

		if (filters.hirePeriod14 && s.hirePeriod !== 14) return false;

		return true;
	});
}

describe("Skip filtering", () => {
	it("returns empty result if no skips match filters", () => {
		const filters = {
			allowedOnRoad: true,
			allowsHeavyWaste: true, // contradicts first skip
			size8: true,
			size12: false,
			hirePeriod14: true,
		};

		const result = filterSkips(mockSkips, filters);
		expect(result.length).toBe(0);
	});

	it("returns all when no filters applied", () => {
		const filters = {
			allowedOnRoad: false,
			allowsHeavyWaste: false,
			size8: false,
			size12: false,
			hirePeriod14: false,
		};

		const result = filterSkips(mockSkips, filters);
		expect(result.length).toBe(2);
	});
});
