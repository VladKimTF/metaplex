import { SafetyDepositDraft } from '../../../../actions/createAuctionManager';

export interface SelectItemsStepProps {
  handleSelectItem: (item: SafetyDepositDraft) => void;
  selectedItems: Record<string, SafetyDepositDraft>;
}
