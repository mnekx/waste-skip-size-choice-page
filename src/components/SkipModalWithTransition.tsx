import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { SkipOption } from "../types/SkipOption";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  selectedIndex: number;
  skipList: SkipOption[];
  onClose: () => void;
  onNav: (index: number) => void;
}

const SkipModalWithTransition = ({
  isOpen,
  selectedIndex,
  skipList,
  onClose,
  onNav,
}: Props) => {
  const currentSkip = skipList[selectedIndex];

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={selectedIndex}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">
                        {currentSkip?.size}-Yard Skip Details
                      </h3>
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Area:</strong> {currentSkip?.area}</p>
                      <p><strong>Hire Period:</strong> {currentSkip?.hirePeriod} days</p>
                      <p><strong>Price:</strong> €{currentSkip?.priceB4VAT}</p>
                      <img
                        src={currentSkip?.imageUrl}
                        alt="Skip"
                        className="rounded-lg mt-3 w-full h-auto"
                      />
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={goPrev}
                        disabled={selectedIndex <= 0}
                        className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                      </button>
                      <button
                        onClick={goNext}
                        disabled={selectedIndex >= skipList.length - 1}
                        className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
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
