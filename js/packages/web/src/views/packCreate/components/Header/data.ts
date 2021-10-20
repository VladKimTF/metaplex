import { CreatePackSteps } from '../../types';
import { HeaderContentRecord } from './interface';

export const HEADER_CONTENT: Record<CreatePackSteps, HeaderContentRecord> = {
  [CreatePackSteps.SelectItems]: {
    title: 'Select items for your Pack Listing',
  },
  [CreatePackSteps.AdjustQuantities]: {
    title: 'Adjust Quantities',
  },
  [CreatePackSteps.SalesSettings]: {
    title: 'Pricing & Expiration ',
  },
  [CreatePackSteps.DesignAndInfo]: {
    title: 'Design your pack and mint',
  },
  [CreatePackSteps.ReviewAndMint]: {
    title: 'Review and mint your pack',
  },
};
