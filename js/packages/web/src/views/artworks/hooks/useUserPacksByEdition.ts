import { useMemo } from 'react';
import { useMeta } from '@oyster/common';

import { useUserVouchersByEdition } from './useUserVouchersByEdition';
import { ExtendedPackByKey, VoucherByKey, PackByKey } from '../types';

export const useUserPacksByEdition = (): ExtendedPackByKey => {
  const { packs } = useMeta();
  const userVouchersByEdition = useUserVouchersByEdition();
  const userPacks = useMemo(
    () => getPacksByEditions({ userVouchersByEdition, packs }),
    [userVouchersByEdition, packs],
  );

  return userPacks;
};

const getPacksByEditions = ({
  userVouchersByEdition,
  packs,
}: {
  userVouchersByEdition: VoucherByKey;
  packs: PackByKey;
}): ExtendedPackByKey =>
  // Use edition as key
  Object.entries(userVouchersByEdition).reduce<ExtendedPackByKey>(
    (acc, [editionKey, voucher]) => {
      if (packs[voucher.info.packSet]) {
        acc[editionKey] = {
          ...packs[voucher.info.packSet],
          voucher: voucher.pubkey,
          edition: editionKey,
        };
      }
      return acc;
    },
    {},
  );
