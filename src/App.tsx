import { useEffect, useState, useRef } from "react";
import SkipCard from "./components/SkipCard";
import type { SkipOption } from "./types/SkipOption";
import { ChevronLeft, ChevronRight } from "lucide-react";

function App() {
	const [skips, setSkips] = useState<SkipOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [canScroll, setCanScroll] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const scrollRef = useRef<HTMLDivElement | null>(null);

	const visibleSkips = skips; //.filter((s) => s.allowedOnRoad);

	const handleScroll = () => {
		if (!scrollRef.current) return;
		const scrollLeft = scrollRef.current.scrollLeft;
		const cardWidth = 260;
		const index = Math.round(scrollLeft / cardWidth);
		setActiveIndex(Math.min(index, visibleSkips.length - 1));
	};

	const scroll = (direction: "left" | "right") => {
		if (!scrollRef.current) return;
		const scrollAmount = 260;
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
	}, [visibleSkips]);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		el.addEventListener("scroll", handleScroll);
		return () => el.removeEventListener("scroll", handleScroll);
	}, [visibleSkips.length]);

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

			<section className="relative">
				<h2 className="text-lg font-semibold mb-2">Allowed on Road</h2>

				{/* Edge fades */}
				<div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10 hidden md:block" />
				<div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10 hidden md:block" />

				{/* Arrows */}
				{canScroll && (
					<>
						<button
							onClick={() => scroll("left")}
							className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-md rounded-full w-10 h-10"
						>
							<ChevronLeft className="w-5 h-5" />
						</button>
						<button
							onClick={() => scroll("right")}
							className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-md rounded-full w-10 h-10"
						>
							<ChevronRight className="w-5 h-5" />
						</button>
					</>
				)}

				{/* Skip cards carousel */}
				<div
					ref={scrollRef}
					className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory space-x-4 pb-2 px-10"
				>
					{visibleSkips.map((skip, i) => (
						<SkipCard key={i} skip={skip} />
					))}
				</div>

				{/* Mobile indicator dots */}
				<div className="flex justify-center mt-2 md:hidden">
					{visibleSkips.map((_, i) => (
						<div
							key={i}
							className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
								i === activeIndex ? "bg-blue-600 scale-125" : "bg-gray-300"
							}`}
						/>
					))}
				</div>
			</section>
		</main>
	);
}

export default App;
