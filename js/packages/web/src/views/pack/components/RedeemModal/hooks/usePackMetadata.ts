import { useMeta } from '@oyster/common';
import { useMemo } from 'react';

export const usePackMetadata = ({ packId }: { packId: string }) => {
  const { packCardsByPackSet, metadataByMasterEdition } = useMeta();

  const cards = packCardsByPackSet[packId];
  const metadata = useMemo(
    () => cards?.map(({ info }) => metadataByMasterEdition[info.master]),
    [cards, metadataByMasterEdition],
  );

  return metadata;
};
