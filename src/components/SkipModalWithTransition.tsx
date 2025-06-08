import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { SkipOption } from "../types/SkipOption";
import { ChevronLeft, ChevronRight, PoundSterling, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
	isOpen: boolean;
	selectedIndex: number;
	skipList: SkipOption[];
	onClose: () => void;
	onNav: (index: number) => void;
	selectedSkip?: SkipOption | null;
}

const SkipModalWithTransition = ({
	isOpen,
	selectedIndex,
	skipList,
	onClose,
	onNav,
	selectedSkip,
}: Props) => {
	const currentSkip = skipList[selectedIndex];

  const total =
	(selectedSkip?.priceB4VAT ?? 0) +
	((selectedSkip?.priceB4VAT ?? 0) * (selectedSkip?.vat ?? 0)) / 100;

	const goPrev = () => onNav(selectedIndex - 1);
	const goNext = () => onNav(selectedIndex + 1);

	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
								<AnimatePresence mode="wait" initial={false}>
									<motion.div
										key={selectedIndex}
										initial={{ x: 100, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										exit={{ x: -100, opacity: 0 }}
										transition={{ duration: 0.3, ease: "easeOut" }}
										className="flex flex-col"
									>
										{/* Header with Close Button */}
										<div className="flex justify-between items-center p-4 border-b">
											<Dialog.Title className="text-lg font-semibold">
												{selectedSkip?.size}-Yard Skip Details
											</Dialog.Title>
											<button
												onClick={onClose}
												className="text-gray-400 hover:text-gray-600"
												aria-label="Close"
											>
												<X className="w-5 h-5" />
											</button>
										</div>

										{/* Image */}
										<img
											src={currentSkip?.imageUrl}
											alt="Skip"
											className="w-full object-cover aspect-video"
										/>

										{/* Info Section */}
										<div className="px-6 py-4 space-y-3">
											<p className="text-sm text-gray-600">
												<strong>Area:</strong> {currentSkip?.area}
											</p>
											<p className="text-sm text-gray-600">
												<strong>Hire Period:</strong> {currentSkip?.hirePeriod}{" "}
												days
											</p>
											<p className="text-lg font-bold text-blue-700 flex items-center gap-1">
												<PoundSterling className="w-5 h-5 text-blue-700" />
												{(total ?? 0).toFixed(2)} incl. VAT
											</p>

											{/* Action Buttons */}
											<div className="mt-4 flex flex-wrap justify-between gap-2">
												<button
													onClick={goPrev}
													disabled={selectedIndex <= 0}
													className="flex items-center px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
												>
													<ChevronLeft className="w-4 h-4 mr-1" />
													Prev
												</button>

												<button
													onClick={goNext}
													disabled={selectedIndex >= skipList.length - 1}
													className="flex items-center px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
												>
													Next
													<ChevronRight className="w-4 h-4 ml-1" />
												</button>

												<button
													onClick={onClose}
													className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
												>
													Continue
												</button>
											</div>
										</div>
									</motion.div>
								</AnimatePresence>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default SkipModalWithTransition;
