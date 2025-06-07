import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import {
	CalendarDays,
	MapPin,
	Truck,
	Weight,
	PoundSterling,
	ChevronRight,
	ChevronLeft,
} from "lucide-react";
import type { SkipModalProps } from "../types/SkipModalProps";

export default function SkipModal({
	isOpen,
	onClose,
	skipList,
	selectedIndex,
	setSelectedIndex,
}: SkipModalProps) {
	const skip = skipList[selectedIndex];
	if (!skip) return null;

	const total = skip.priceB4VAT + (skip.priceB4VAT * skip.vat) / 100;
	const goPrev = () => {
		const newIndex = (selectedIndex - 1 + skipList.length) % skipList.length;
		setSelectedIndex(newIndex);
	};

	const goNext = () => {
		const newIndex = (selectedIndex + 1) % skipList.length;
		setSelectedIndex(newIndex);
	};

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleContinue = () => {
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			onClose();
		}, 1000);
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto p-4">
					<div className="flex min-h-full items-center justify-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-200"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-150"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
								{/* Image */}
								<div className="relative h-48 sm:h-64">
									<img
										src={skip.imageUrl}
										alt={`${skip.size}-yard skip`}
										className="absolute inset-0 w-full h-full object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
									<div className="absolute bottom-3 left-4 text-white text-xl font-bold">
										{skip.size}-Yard Skip
									</div>
								</div>

								{/* Carousel Arrows */}
								<button
									onClick={goPrev}
									className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-1 hover:bg-gray-100"
								>
									<ChevronLeft className="w-5 h-5" />
								</button>
								<button
									onClick={goNext}
									className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-1 hover:bg-gray-100"
								>
									<ChevronRight className="w-5 h-5" />
								</button>

								{/* Content */}
								<div className="p-5 space-y-3">
									<div className="flex items-center gap-2 text-sm text-gray-700">
										<CalendarDays className="w-4 h-4 text-blue-500" />
										Hire Period: {skip.hirePeriod} days
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-700">
										<MapPin className="w-4 h-4 text-green-500" />
										Postcode: {skip.postCode}
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-700">
										<Truck className="w-4 h-4 text-orange-500" />
										Road Use:{" "}
										<span className="font-medium">
											{skip.allowedOnRoad ? "Allowed" : "Not allowed"}
										</span>
									</div>
									<div className="flex items-center gap-2 text-sm text-gray-700">
										<Weight className="w-4 h-4 text-purple-500" />
										Heavy Waste:{" "}
										<span className="font-medium">
											{skip.allowsHeavyWaste ? "Yes" : "No"}
										</span>
									</div>
									<div className="flex items-center gap-2 text-base font-semibold text-gray-800 mt-3">
										<PoundSterling className="w-5 h-5" />
										{total.toFixed(2)} incl. VAT
									</div>

									{/* Actions */}
									<div className="mt-4 flex justify-end gap-4">
										<button
											onClick={onClose}
											className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
										>
											Cancel
										</button>
										<button
											onClick={handleContinue}
											disabled={isSubmitting}
											className="w-[30%] bg-blue-600 text-white py-1.5 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 hover:ring-2 hover:ring-offset-2 cursor-pointer hover:ring-blue-300"
										>
											{isSubmitting ? "Processing..." : "Continue"}
										</button>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
