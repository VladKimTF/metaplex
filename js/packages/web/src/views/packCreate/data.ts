import { PackDistributionType } from '@oyster/common';
import { PackState } from './interface';

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
  allowedAmountToRedeem: 0,
  distribution: {
    distributionType: PackDistributionType.fixed,
    distributions: {},
  },
};
