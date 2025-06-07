import { render, screen } from "@testing-library/react";
import SkipModal from "../components/SkipModal";
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
	imageUrl:
		"https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
};

describe("SkipModal", () => {
	it("renders modal with skip details when open", () => {
		render(
			<SkipModal
				isOpen={true}
				skipList={[mockSkip]}
				selectedIndex={0}
				onNav={() => {}}
				onClose={() => {}}
			/>
		);

		expect(screen.getByText(/8-yard skip/i)).toBeInTheDocument();
		expect(screen.getByText(/NR32/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Continue/i })).toBeInTheDocument();
	});

	it("does not render modal content when closed", () => {
		render(
			<SkipModal
				isOpen={false}
				skipList={[mockSkip]}
				selectedIndex={0}
				onNav={() => {}}
				onClose={() => {}}
			/>
		);

		expect(screen.queryByText(/8-yard skip/i)).not.toBeInTheDocument();
	});
});
