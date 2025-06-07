import type { SkipOption } from "./SkipOption";

export type SkipModalProps = {
	isOpen: boolean;
	onClose: () => void;
	skipList: SkipOption[];
	selectedIndex: number;
	onNav: (index: number) => void;
};
