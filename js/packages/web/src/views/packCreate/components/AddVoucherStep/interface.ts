import { ReactElement } from 'react';

import { SafetyDepositDraft } from '../../../../actions/createAuctionManager';
import { PackState } from '../../interface';
import { CreatePackSteps } from '../../types';

export interface AddVoucherStepProps {
  confirm: (step?: CreatePackSteps) => void;
  setPackState: (values: Partial<PackState>) => void;
  vouchersItems: SafetyDepositDraft[];
  vouchersCount: number[];
  backButton: ReactElement;
}
