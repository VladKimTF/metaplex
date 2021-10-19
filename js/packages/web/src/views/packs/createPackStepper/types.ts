import { SafetyDepositDraft } from '../../../actions/createAuctionManager';
import { AuctionState } from '../../auctionCreate';

export interface PackState extends AuctionState {
  vouchersItems: SafetyDepositDraft[];
  cardsItems: SafetyDepositDraft[];
  vouchersCount: number[];
  cardsCount: number[];
  actionOnProve: string;
  distribution: string;
}

export enum CreatePackSteps {
  CreatePack,
  AddVoucher,
  AddCard,
  Final,
}
