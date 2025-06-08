import { ChevronLeft, ChevronRight } from "lucide-react";
import SkipCard from "../components/SkipCard";
import type { SkipOption } from "../types/SkipOption";

interface SkipCarouselProps {
	visibleSkips: SkipOption[];
	canScroll: boolean;
	activeIndex: number;
	scrollRef: React.RefObject<HTMLDivElement | null>;
	onArrowKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	onSelectSkip: (skip: SkipOption) => void;
	onScrollLeft: () => void;
	onScrollRight: () => void;
}

export default function SkipCarousel({
	visibleSkips,
	canScroll,
	activeIndex,
	scrollRef,
	onArrowKeyPress,
	onSelectSkip,
	onScrollLeft,
	onScrollRight,
}: SkipCarouselProps) {
	return (
		<section className="relative">
			{/* Edge fades */}
			<div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none z-10 hidden md:block" />
			<div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white via-white/60 to-transparent pointer-events-none z-10 hidden md:block" />

			{/* Arrows */}
			{canScroll && (
				<>
					<button
						onClick={onScrollLeft}
						className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm border border-gray-300 hover:bg-white shadow-lg rounded-full w-11 h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
						aria-label="Scroll left"
					>
						<ChevronLeft className="w-6 h-6 text-gray-700" />
					</button>

					<button
						onClick={onScrollRight}
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
						isSelected={false} // Selection handled in parent
						onSelect={() => onSelectSkip(skip)}
						onArrowKeyPress={onArrowKeyPress}
					/>
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
	);
}
