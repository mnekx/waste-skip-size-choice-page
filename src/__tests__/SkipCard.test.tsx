import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SkipCard from "../components/SkipCard";
import type { SkipOption } from "../types/SkipOption";

const mockSkip: SkipOption = {
	size: 8,
	hirePeriod: 14,
	transportCost: null,
	perTonneCost: null,
	priceB4VAT: 375,
	vat: 20,
	postCode: "NR32",
	area: "Lowestoft",
	forbidden: false,
	createdAt: "2025-04-03T13:51:46.897146",
	updatedAt: "2025-04-07T13:16:53.171",
	allowedOnRoad: true,
	allowsHeavyWaste: true,
	imageUrl: "https://example.com/skip.jpg",
};

describe("SkipCard", () => {
	it("Renders skip size and postcode", () => {
		render(<SkipCard skip={mockSkip} onSelect={() => {}} />);
		expect(screen.getByText(/8-Yard Skip/i)).toBeInTheDocument();
		expect(screen.getByText(/NR32/)).toBeInTheDocument();
	});

	it("It shows image with correct alt", () => {
		const { getByAltText } = render(
			<SkipCard skip={mockSkip} onSelect={() => {}} />
		);
		const image = getByAltText("8-yard skip") as HTMLImageElement;
		expect(image).toBeInTheDocument();
		expect(image.src).toContain(mockSkip.imageUrl);
	});
});
