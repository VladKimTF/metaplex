import { ReactElement } from 'react';

import { SafetyDepositDraft } from '../../../../actions/createAuctionManager';
import { PackState } from '../../interface';
import { CreatePackSteps } from '../../types';

export interface AddCardStepProps {
  confirm: (step?: CreatePackSteps) => void;
  setPackState: (values: Partial<PackState>) => void;
  cardsItems: SafetyDepositDraft[];
  cardsCount: Record<number, Record<number, string>>[];
  backButton: ReactElement;
  distribution: string;
}
