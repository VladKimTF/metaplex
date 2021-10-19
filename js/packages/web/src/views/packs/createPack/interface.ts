import { PackDistributionType } from '@oyster/common';

export interface CreatePackFormValues {
  name: string;
  distributionType: PackDistributionType;
  allowedAmountToRedeem: number;
  uri: string;
  redeemStartDate: moment.Moment;
  redeemEndDate: moment.Moment;
  mutable: boolean;
}
