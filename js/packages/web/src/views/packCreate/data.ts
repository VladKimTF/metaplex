import { CreatePackSteps, PackState } from './types';

export const STEPS_TITLES: Record<CreatePackSteps, string> = {
  [CreatePackSteps.CreatePack]: 'Create Pack',
  [CreatePackSteps.AddVoucher]: 'Add Voucher',
  [CreatePackSteps.AddCard]: 'Add Card',
  [CreatePackSteps.Final]: 'Final',
};

export const INITIAL_PACK_STATE: PackState = {
  category: 3,
  reservationPrice: 0,
  items: [],
  cardsItems: [],
  vouchersItems: [],
  vouchersCount: [],
  cardsCount: [],
  auctionDurationType: 'minutes',
  gapTimeType: 'minutes',
  winnersCount: 1,
  actionOnProve: 'Burn',
  distribution: 'fixed',
};
