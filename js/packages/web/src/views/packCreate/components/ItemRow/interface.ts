import { SafetyDepositDraft } from '../../../../../../actions/createAuctionManager';

export interface ItemRowProps {
  isSelected?: boolean;
  onClick?: () => void;
  item: SafetyDepositDraft;
  onInputChange?: (value: string) => void;
  inputValue?: string;
}
