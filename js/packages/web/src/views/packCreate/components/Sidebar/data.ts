import { CreatePackSteps } from '../../types';

export const STEPS_TITLES: Record<CreatePackSteps, string> = {
  [CreatePackSteps.SelectItems]: 'Select Items',
  [CreatePackSteps.AdjustQuantities]: 'Adjust Quantities',
  [CreatePackSteps.SalesSettings]: 'Sales Settings',
  [CreatePackSteps.DesignAndInfo]: 'Info & Design',
  [CreatePackSteps.ReviewAndMint]: 'Review & Mint',
};

export const CONTINUE_TITLES: Record<CreatePackSteps, string> = {
  [CreatePackSteps.SelectItems]: 'Continue to Quantities',
  [CreatePackSteps.AdjustQuantities]: 'Continue to Sales',
  [CreatePackSteps.SalesSettings]: 'Continue to Design',
  [CreatePackSteps.DesignAndInfo]: 'Continue to Mint',
  [CreatePackSteps.ReviewAndMint]: 'Confirm & Mint',
};
