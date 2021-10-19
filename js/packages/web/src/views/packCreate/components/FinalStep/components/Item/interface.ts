import { SafetyDepositDraft } from '../../../../../../actions/createAuctionManager';
import { ItemType } from './types';

export interface ItemProps {
  item: SafetyDepositDraft;
  type: ItemType;
  cardsCount: Record<number, Record<number, string>>[];
}
