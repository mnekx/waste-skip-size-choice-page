import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import type { SkipOption } from "../types/SkipOption";

type SkipModalProps = {
	skip: SkipOption | null;
	isOpen: boolean;
	onClose: () => void;
};

export default function SkipModal({ skip, isOpen, onClose }: SkipModalProps) {
	if (!skip) return null;

	const total = skip.priceB4VAT + (skip.priceB4VAT * skip.vat) / 100;

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z=50" onClose={onClose}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-100"
				>
					<div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-0 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
								<DialogTitle className="text-xl font-bold mb-4">
									{skip.size}-Yard Skip
								</DialogTitle>
								<img
									src={skip.imageUrl}
									alt={`${skip.size}-yard skip`}
									className="w-full h-32 object-cover rounded mb-4"
								/>
								<ul className="text-sm space-y-1">
									<li>
										<strong>Hire:</strong> {skip.hirePeriod} days
									</li>
									<li>
										<strong>Postcode:</strong> {skip.postCode}
									</li>
									<li>
										<strong>On Road:</strong>{" "}
										{skip.allowedOnRoad ? "Yes" : "No"}
									</li>
									<li>
										<strong>Heavy Waste:</strong>{" "}
										{skip.allowsHeavyWaste ? "Yes" : "No"}
									</li>
									<li>
										<strong>Total Price:</strong> TZS {total.toLocaleString()}
									</li>
								</ul>
								<div className="mt-6 flex justify-between">
									<button
										className="text-sm text-gray-500 hover:underline"
										onClick={onClose}
									>
										Cancel
									</button>
									<button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
										Continue
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
