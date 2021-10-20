import { Creator, StringPublicKey } from '@oyster/common';

import { SafetyDepositDraft } from '../../../../actions/createAuctionManager';

export const artistFilter = ({ metadata }: SafetyDepositDraft) =>
  !(metadata.info.data.creators || []).some((c: Creator) => !c.verified);

export const isSelected = ({
  selectedItems,
  pubkey,
}: {
  selectedItems: Record<string, SafetyDepositDraft>;
  pubkey?: StringPublicKey;
}): boolean => !!(pubkey && selectedItems[pubkey]);
