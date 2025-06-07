import { useEffect, useState, useRef } from "react";
import SkipCard from "./components/SkipCard";
import type { SkipOption } from "./types/SkipOption";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FilterPanel from "./components/FilterPanel";
import type { FiltersType } from "./types/FiltersType";
import SkipModal from "./components/SkipModal";
import { Filter } from "lucide-react";
import { useClickOutside } from "./hooks/useClickOutside";
import { handleError } from "./utils/handleError";
import SkipCardSkeleton from "./components/SkipCardSkeleton";

function App() {
	const [skips, setSkips] = useState<SkipOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [canScroll, setCanScroll] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const [filters, setFilters] = useState({
		allowedOnRoad: false,
		allowsHeavyWaste: false,
		size8: false,
		size12: false,
		hirePeriod14: false,
	});
	const [selectedSkip, setSelectedSkip] = useState<SkipOption | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	const handleModalNavigate = (newIndex: number) => {
		const skip = skips[newIndex];
		if (!skip) return;
		handleSelectSkip(skip);
		scrollToCard(newIndex);
	};

	const handleSelectSkip = (skip: SkipOption) => {
		const index = visibleSkips.findIndex((s) => s === skip);
		const cards = scrollRef.current?.querySelectorAll('[role="button"]');
		if (!cards || cards.length === 0) return;
		(cards[index] as HTMLElement).focus(); // Focus the selected card
		setSelectedIndex(index);
		setSelectedSkip(skip);
		setIsModalOpen(true);
	};
	const [showFilters, setShowFilters] = useState(false);

	const handleFilterChange = (key: keyof FiltersType) => {
		setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const visibleSkips = skips.filter((s) => {
		if (filters.allowedOnRoad && !s.allowedOnRoad) return false;
		if (filters.allowsHeavyWaste && !s.allowsHeavyWaste) return false;
		return true;
	});

	const handleScroll = () => {
		if (!scrollRef.current) return;
		const scrollLeft = scrollRef.current.scrollLeft;
		const cardWidth = 260;
		const index = Math.round(scrollLeft / cardWidth);
		setActiveIndex(Math.min(index, visibleSkips.length - 1));
	};

	const handleClearFilters = () => {
		setFilters({
			allowedOnRoad: false,
			allowsHeavyWaste: false,
			size8: false,
			size12: false,
			hirePeriod14: false,
		});
	};

	const handleArrowKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const cards = scrollRef.current?.querySelectorAll('[role="button"]');
		if (!cards || cards.length === 0) return;

		const activeElement = document.activeElement;
		const index = Array.from(cards).indexOf(activeElement as HTMLElement);

		if (e.key === "ArrowRight") {
			const nextIndex = (index + 1) % cards.length;
			(cards[nextIndex] as HTMLElement).focus();
			e.preventDefault();
		}
		if (e.key === "ArrowLeft") {
			const prevIndex = (index - 1 + cards.length) % cards.length;
			(cards[prevIndex] as HTMLElement).focus();
			e.preventDefault();
		}
	};

	const scrollToCard = (index: number) => {
		if (!scrollRef.current) return;
		const cardWidth = 260; // Or your exact card size including margin
		const scrollAmount = index * cardWidth;
		scrollRef.current.scrollTo({
			left: scrollAmount,
			behavior: "smooth",
		});
	};

	const scroll = (direction: "left" | "right") => {
		if (!scrollRef.current) return;
		const scrollAmount = 260;
		scrollRef.current.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
	};

	const filterRef = useRef<HTMLDivElement>(null);

	useClickOutside(filterRef, () => setShowFilters(false));

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
	}, [visibleSkips.length, handleScroll]);

	useEffect(() => {
		const fetchSkips = async () => {
			try {
				const res = await fetch(
					"https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
				);
				if (!res.ok) throw new Error("Failed to fetch skip data");
				const rawData: [] = await res.json();

				const mappedData: SkipOption[] = rawData.map(
					(item: {
						size: number;
						hire_period_days: number;
						transport_cost: number;
						per_tonne_cost: number;
						price_before_vat: number;
						vat: number;
						postcode: string;
						area: string;
						forbidden: boolean;
						created_at: string;
						updated_at: string;
						allowed_on_road: boolean;
						allows_heavy_waste: boolean;
					}) => ({
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
					})
				);

				setSkips(mappedData);
			} catch (err: unknown) {
				handleError(err, setError, "Fetching Data");
			} finally {
				setLoading(false);
			}
		};

		fetchSkips();
	}, []);

	if (loading) {
		return (
			<main className="relative p-4 max-w-screen-xl mx-auto space-y-6 pt-32">
				<h1 className="text-2xl font-bold mb-4">Choose Your Skip Size</h1>
				<div className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory space-x-4 pb-2 px-10">
					{Array.from({ length: 5 }).map((_, i) => (
						<SkipCardSkeleton key={i} />
					))}
				</div>
			</main>
		);
	}
	if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

	return (
		<main className="relative p-4 max-w-screen-xl mx-auto space-y-6 pt-32">
			{/* Accessibility live region */}
			<div aria-live="polite" className="sr-only">
				{selectedSkip ? `${selectedSkip.size}-yard skip selected` : ""}
			</div>
			<div className="flex items-center">
				<h1 className="text-2xl font-bold">Choose Your Skip Size</h1>

				<div className="relative z-20 inline-block left-4">
					<button
						onClick={() => setShowFilters((prev) => !prev)}
						className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none"
						aria-label="Toggle filters"
					>
						<Filter className="w-5 h-5" />
					</button>

					{showFilters && (
						<div
							ref={filterRef}
							className="absolute left-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg"
						>
							<FilterPanel
								filters={filters}
								onChange={handleFilterChange}
								onClear={handleClearFilters}
							/>
						</div>
					)}
				</div>
			</div>

			<section className="relative">
				<h2 className="text-lg left-4 font-semibold mb-2 ml-3">
					Showing Skips
					{filters.allowedOnRoad && " • Allowed on Road"}
					{filters.allowsHeavyWaste && " • Allows Heavy Waste"}
					{!filters.allowedOnRoad && !filters.allowsHeavyWaste && " • All"}
				</h2>

				{/* Edge fades */}
				<div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none z-10 hidden md:block" />
				<div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white via-white/60 to-transparent pointer-events-none z-10 hidden md:block" />

				{/* Arrows */}
				{canScroll && (
					<>
						<button
							onClick={() => scroll("left")}
							className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm border border-gray-300 hover:bg-white shadow-lg rounded-full w-11 h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
							aria-label="Scroll left"
						>
							<ChevronLeft className="w-6 h-6 text-gray-700" />
						</button>

						<button
							onClick={() => scroll("right")}
							className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm border border-gray-300 hover:bg-white shadow-lg rounded-full w-11 h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
							aria-label="Scroll right"
						>
							<ChevronRight className="w-6 h-6 text-gray-700" />
						</button>
					</>
				)}

				{/* Skip cards carousel */}
				<div
					ref={scrollRef}
					className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory space-x-4 pt-4 pb-4 px-10"
				>
					{visibleSkips.map((skip, i) => (
						<SkipCard
							key={i}
							skip={skip}
							isSelected={
								selectedSkip?.postCode === skip.postCode &&
								selectedSkip?.size === skip.size
							}
							onSelect={() => handleSelectSkip(skip)}
							onArrowKeyPress={(e) => handleArrowKeyPress(e)}
						/>
					))}
					<SkipModal
						selectedIndex={selectedIndex}
						onNav={handleModalNavigate}
						skipList={visibleSkips}
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
					/>
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
