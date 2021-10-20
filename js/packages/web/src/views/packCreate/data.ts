import { PackState } from './interface';
import { CreatePackSteps } from './types';

export const STEPS_TITLES: Record<CreatePackSteps, string> = {
  [CreatePackSteps.SelectItems]: 'Select Items',
  [CreatePackSteps.AdjustQuantities]: 'Adjust Quantities',
  [CreatePackSteps.SalesSettings]: 'Sales Settings',
  [CreatePackSteps.DesignAndInfo]: 'Info & Design',
  [CreatePackSteps.ReviewAndMint]: 'Review & Mint',
};

export const INITIAL_PACK_STATE: PackState = {
  category: 3,
  reservationPrice: 0,
  items: [],
  selectedItems: {},
  vouchersItems: [],
  vouchersCount: [],
  cardsCount: [],
  auctionDurationType: 'minutes',
  gapTimeType: 'minutes',
  winnersCount: 1,
  actionOnProve: 'Burn',
  distribution: 'fixed',
};
