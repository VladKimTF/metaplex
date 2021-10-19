import { CreatePackSteps } from './types';

export const STEPS_TITLES: Record<CreatePackSteps, string> = {
  [CreatePackSteps.CreatePack]: 'Create Pack',
  [CreatePackSteps.AddVoucher]: 'Add Voucher',
  [CreatePackSteps.AddCard]: 'Add Card',
  [CreatePackSteps.Final]: 'Final',
};
