import { useEffect, useState, useRef, useCallback } from "react";
import SkipSkeletonCarousel from "./components/SkipSkelectonCarousel";
import EmptyState from "./components/EmptyState";
import type { SkipOption } from "./types/SkipOption";
import type { FiltersType } from "./types/FiltersType";
import { useClickOutside } from "./hooks/useClickOutside";
import { handleError } from "./utils/handleError";
import Header from "./sections/Header";
import FiltersSummary from "./sections/FilterSummary";
import SkipCarousel from "./components/SkipCarousel";
import SkipModalWithTransition from "./components/SkipModalWithTransition";
import type { RawSkipType } from "./types/RawSkipType";
import { ErrorComponent } from "./components/ErrorComponent";

function App() {
	const [skips, setSkips] = useState<SkipOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [canScroll, setCanScroll] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedSkip, setSelectedSkip] = useState<SkipOption | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [showFilters, setShowFilters] = useState(false);

	const scrollRef = useRef<HTMLDivElement | null>(null);
	const filterRef = useRef<HTMLDivElement>(null);

	const [filters, setFilters] = useState<FiltersType>({
		allowedOnRoad: false,
		allowsHeavyWaste: false,
		size8: false,
		size12: false,
		hirePeriod14: false,
	});

	// const activeFilters = Object.entries(filters).filter(([, value]) => value);

	const handleRemoveFilter = (key: keyof FiltersType) =>
		setFilters((prev) => ({ ...prev, [key]: false }));

	const handleFilterChange = (key: keyof FiltersType) =>
		setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

	const handleClearFilters = () =>
		setFilters({
			allowedOnRoad: false,
			allowsHeavyWaste: false,
			size8: false,
			size12: false,
			hirePeriod14: false,
		});

	const visibleSkips = skips.filter((s) => {
		if (filters.allowedOnRoad && !s.allowedOnRoad) return false;
		if (filters.allowsHeavyWaste && !s.allowsHeavyWaste) return false;

		const sizeFilters = [];
		if (filters.size8) sizeFilters.push(8);
		if (filters.size12) sizeFilters.push(12);
		if (sizeFilters.length && !sizeFilters.includes(s.size)) return false;

		if (filters.hirePeriod14 && s.hirePeriod !== 14) return false;
		return true;
	});

	const handleSelectSkip = (skip: SkipOption) => {
		const index = visibleSkips.findIndex((s) => s === skip);
		const cards = scrollRef.current?.querySelectorAll('[role="button"]');
		if (!cards || cards.length === 0) return;

		(cards[index] as HTMLElement).focus();
		setSelectedIndex(index);
		setSelectedSkip(skip);
		setIsModalOpen(true);
	};

	const handleModalNavigate = (newIndex: number) => {
		const skip = skips[newIndex];
		if (!skip) return;
		handleSelectSkip(skip);
		scrollToCard(newIndex);
	};

	const scrollToCard = (index: number) => {
		if (!scrollRef.current) return;
		const scrollAmount = index * 260;
		scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
	};

	const scroll = (direction: "left" | "right") => {
		if (!scrollRef.current) return;
		const scrollAmount = 260;
		scrollRef.current.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
	};

	const handleArrowKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const cards = scrollRef.current?.querySelectorAll('[role="button"]');
		if (!cards?.length) return;

		const index = Array.from(cards).indexOf(
			document.activeElement as HTMLElement
		);

		if (e.key === "ArrowRight") {
			const next = (index + 1) % cards.length;
			(cards[next] as HTMLElement).focus();
			e.preventDefault();
		}
		if (e.key === "ArrowLeft") {
			const prev = (index - 1 + cards.length) % cards.length;
			(cards[prev] as HTMLElement).focus();
			e.preventDefault();
		}
	};

	const handleScroll = useCallback(() => {
		if (!scrollRef.current) return;
		const scrollLeft = scrollRef.current.scrollLeft;
		const index = Math.round(scrollLeft / 260);
		setActiveIndex(Math.min(index, visibleSkips.length - 1));
	}, [visibleSkips.length]);

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
	}, [handleScroll, visibleSkips.length]);

	useEffect(() => {
		const fetchSkips = async () => {
			try {
				const res = await fetch(
					"https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
				);
				if (!res.ok) throw new Error("Failed to fetch skip data");
				const rawData: [] = await res.json();

				const mappedData: SkipOption[] = rawData.map((item: RawSkipType) => ({
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
			<main className="p-4 max-w-screen-xl mx-auto pt-32 space-y-6">
				<Header
					showFilters={showFilters}
					setShowFilters={setShowFilters}
					filters={filters}
					onFilterChange={handleFilterChange}
					onClearFilters={handleClearFilters}
				/>
				<SkipSkeletonCarousel />
			</main>
		);
	}
	if (error)
		return (
			<ErrorComponent message="An error occurred while fetching skips. Please try again later." />
		);

	return (
		<main className="p-4">
			<Header
				showFilters={showFilters}
				setShowFilters={setShowFilters}
				filters={filters}
				onFilterChange={handleFilterChange}
				onClearFilters={handleClearFilters}
			/>

			<FiltersSummary
				activeFilters={
					Object.entries(filters).filter(([, value]) => value) as [
						keyof FiltersType,
						boolean
					][]
				}
				onRemoveFilter={handleRemoveFilter}
			/>

			<SkipCarousel
				visibleSkips={visibleSkips}
				canScroll={canScroll}
				activeIndex={activeIndex}
				scrollRef={scrollRef}
				onArrowKeyPress={handleArrowKeyPress}
				onSelectSkip={handleSelectSkip}
				onScrollLeft={() => scroll("left")}
				onScrollRight={() => scroll("right")}
				// selectedSkip={selectedSkip}
				// selectedIndex={selectedIndex}
				// isModalOpen={isModalOpen}
				// onModalClose={() => setIsModalOpen(false)}
				// onModalNavigate={handleModalNavigate}
			/>
			<SkipModalWithTransition
				selectedIndex={selectedIndex}
				skipList={visibleSkips}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onNav={handleModalNavigate}
				selectedSkip={selectedSkip}
			/>

			{visibleSkips.length === 0 && (
				<EmptyState onClearFilters={handleClearFilters} />
			)}
		</main>
	);
}

export default App;
