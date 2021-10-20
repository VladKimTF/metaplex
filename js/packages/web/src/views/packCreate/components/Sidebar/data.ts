import { CreatePackSteps } from '../../types';

export const STEPS_TITLES: Record<CreatePackSteps, string> = {
  [CreatePackSteps.SelectItems]: 'Select Items',
  [CreatePackSteps.AdjustQuantities]: 'Adjust Quantities',
  [CreatePackSteps.SalesSettings]: 'Sales Settings',
  [CreatePackSteps.DesignAndInfo]: 'Info & Design',
  [CreatePackSteps.ReviewAndMint]: 'Review & Mint',
};
