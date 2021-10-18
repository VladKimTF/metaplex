import { PackState } from '../../interface';

export enum InputType {
  probability = 'probability',
  maxSupply = 'maxSupply',
}

export interface AdjustQuantitiesStepProps
  extends Pick<
    PackState,
    | 'allowedAmountToRedeem'
    | 'distributionType'
    | 'selectedItems'
    | 'probabilityByMetadataKey'
    | 'supplyByMetadataKey'
  > {
  setPackState: (values: Partial<PackState>) => void;
  isUnlimited: boolean;
}
