import { SafetyDepositDraft } from '../../../actions/createAuctionManager';
import { AuctionState } from '../../auctionCreate';
import { CreatePackFormValues } from '../createPack/interface';

export interface PackState extends AuctionState {
  vouchersItems: SafetyDepositDraft[];
  cardsItems: SafetyDepositDraft[];
  vouchersCount: number[];
  cardsCount: Record<number, Record<number, string>>[];
  actionOnProve: string;
  distribution: string;
  formValues?: CreatePackFormValues;
}

export enum CreatePackSteps {
  CreatePack,
  AddVoucher,
  AddCard,
  Final,
}
