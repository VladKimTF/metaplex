import { SafetyDepositDraft } from '../../../../../../actions/createAuctionManager';

export interface ItemRowProps {
  isSelected: boolean;
  onClick: () => void;
  item: SafetyDepositDraft;
}
