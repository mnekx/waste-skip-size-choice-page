import { render, screen } from "@testing-library/react";
import type { SkipOption } from "../types/SkipOption";
import SkipModal from "../components/SkipModal";

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
	imageUrl:
		"https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
};

describe("SkipModal", () => {
	it("render modal with skip details when open", () => {
		render(<SkipModal isOpen={true} skip={mockSkip} onClose={() => {}} />);

		expect(screen.getByText(/8-yard skip/i)).toBeInTheDocument();
		expect(screen.getByText(/Postcode: NR32/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Continue/i })
		).toBeInTheDocument();
	});

	it("does not render modal content when closed", () => {
		render(<SkipModal isOpen={false} skip={mockSkip} onClose={() => {}} />);
		expect(screen.queryByText(/8-yard skip/i)).not.toBeInTheDocument();
	});
});
