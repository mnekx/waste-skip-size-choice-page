import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { vi } from "vitest";

const mockFetchResponse = [
	{
		size: 8,
		hire_period_days: 14,
		transport_cost: null,
		per_tonne_cost: null,
		price_before_vat: 375,
		vat: 20,
		postcode: "NR32",
		area: "Lowestoft",
		forbidden: false,
		created_at: "2025-04-03T13:51:46.897146",
		updated_at: "2025-04-07T13:16:53.171",
		allowed_on_road: true,
		allows_heavy_waste: true,
	},
];

vi.stubGlobal(
	"fetch",
	vi.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve(mockFetchResponse),
		})
	) as any
);

describe("App", () => {
	it("Renders skip data from API", async () => {
		render(<App />);
		expect(screen.getByText("Loading skip data...")).toBeInTheDocument();

		await waitFor(() =>
			expect(screen.getByText(/Choose your skip size/i)).toBeInTheDocument()
		);

		expect(screen.getByText(/8-Yard Skip/i)).toBeInTheDocument();
	});
});
