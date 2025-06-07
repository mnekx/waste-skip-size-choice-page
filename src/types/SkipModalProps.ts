import type { SkipOption } from "./SkipOption";

export type SkipModalProps = {
  isOpen: boolean;
  onClose: () => void;
  skipList: SkipOption[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}