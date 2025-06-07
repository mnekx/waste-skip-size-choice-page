import type { SkipOption } from "../types/SkipOption";
import { Calendar, PoundSterling } from "lucide-react";

export default function SkipCard({
	skip,
	isSelected,
	onSelect,
	onArrowKeyPress,
}: {
	skip: SkipOption;
	isSelected?: boolean;
	onSelect: () => void;
	onArrowKeyPress?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
	const total = skip.priceB4VAT + (skip.priceB4VAT * skip.vat) / 100;

	return (
		<div
			tabIndex={0}
			role="button"
			aria-pressed={isSelected}
			onClick={onSelect}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onSelect();
				}
				onArrowKeyPress?.(e);
			}}
			className={`cursor-pointer snap-start min-w-[260px] max-w-[300px] bg-white rounded-xl shadow p-4 mr-4 flex-shrink-0 border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 ${
				isSelected ? "border-blue-600 ring-blue-400 animate-[pulse_1s_ease-in-out]" : "border-gray-200"
			}`}
		>
			{skip.imageUrl && (
				<img
					src={skip.imageUrl}
					alt={`${skip.size}-yard skip`}
					className="w-full h-36 object-cover rounded mb-3"
				/>
			)}

			<h3 className="text-lg font-semibold mb-1">{skip.size}-Yard Skip</h3>
			{/* Hire period */}
			<div className="flex items-center text-sm text-gray-600 mb-1">
				<Calendar className="w-4 h-4 mr-1" />
				{skip.hirePeriod} days hire
			</div>
			{/* Price before VAT */}
			<div className="flex items-baseline gap-1 text-base font-bold text-gray-800 mb-3">
				<PoundSterling className="w-4 h-4 text-green-700" />
				<span className="text-lg text-green-800">{total.toFixed(2)}</span>
				<span className="text-xs text-gray-500 font-medium ml-1">
					incl. VAT
				</span>
			</div>

			{/* Select Button */}
			<button
				onClick={onSelect}
				className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 hover:ring-2 hover:ring-offset-2 cursor-pointer hover:ring-blue-300"
			>
				Select Skip
			</button>
		</div>
	);
}
