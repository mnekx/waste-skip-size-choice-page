import { useEffect, useState } from "react";
import SkipCard from "./components/SkipCard";
import { useRef } from "react";
import type { SkipOption } from "./types/SkipOption";

function App() {
	const [skips, setSkips] = useState<SkipOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [canScroll, setCanScroll] = useState(false);

	const scrollRef = useRef<HTMLDivElement | null>(null);

	const scroll = (direction: "left" | "right") => {
		if (!scrollRef.current) return;
		const scrollAmount = 260; // width of one card
		scrollRef.current.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const checkScroll = () => {
			if (!scrollRef.current) return;
			const el = scrollRef.current;
			setCanScroll(el.scrollWidth > el.clientWidth);
		};

		checkScroll();
		window.addEventListener("resize", checkScroll);
		return () => window.removeEventListener("resize", checkScroll);
	}, [skips]);

	useEffect(() => {
		const fetchSkips = async () => {
			try {
				const res = await fetch(
					"https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
				);
				if (!res.ok) throw new Error("Failed to fetch skip data");
				const rawData: [] = await res.json();

				const mappedData: SkipOption[] = rawData.map((item: any) => ({
					size: item.size,
					hirePeriod: item.hire_period_days,
					transportCost: item.transport_cost,
					perTonneCost: item.per_tonne_cost,
					priceB4VAT: item.price_before_vat,
					vat: item.vat,
					postCode: item.postcode,
					area: item.area,
					forbidden: item.forbidden,
					createdAt: item.created_at,
					updatedAt: item.updated_at,
					allowedOnRoad: item.allowed_on_road,
					allowsHeavyWaste: item.allows_heavy_waste,
					imageUrl:
						"https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg",
				}));

				setSkips(mappedData);
			} catch (err: any) {
				setError(err.message || "Unexpected error");
			} finally {
				setLoading(false);
			}
		};

		fetchSkips();
	}, []);

	if (loading) return <p className="p-4">Loading skip data...</p>;
	if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

	return (
		<main className="p-4 max-w-screen-xl mx-auto space-y-6">
			<h1 className="text-2xl font-bold">Choose Your Skip Size</h1>

			<section>
				<h2 className="text-lg font-semibold mb-2">Allowed on Road</h2>
				{canScroll && (
					<>
						<button
							onClick={() => scroll("left")}
							className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-md rounded-full w-10 h-10"
						>
							<span className="text-xl font-bold">◀</span>
						</button>
						<button
							onClick={() => scroll("right")}
							className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-md rounded-full w-10 h-10"
						>
							<span className="text-xl font-bold">▶</span>
						</button>
					</>
				)}
				<div
					ref={scrollRef}
					className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory space-x-4 pb-2 px-10"
				>
					{skips
						// .filter((s) => s.allowedOnRoad)
						.map((skip, i) => (
							<SkipCard key={i} skip={skip} />
						))}
				</div>
			</section>
		</main>
	);
}

export default App;
