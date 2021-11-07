import { MetaState } from './types';

export const getEmptyMetaState = (): MetaState => ({
  metadata: [],
  metadataByMetadata: {},
  metadataByMint: {},
  metadataByAuction: {},
  masterEditions: {},
  masterEditionsByPrintingMint: {},
  masterEditionsByOneTimeAuthMint: {},
  metadataByMasterEdition: {},
  editions: {},
  auctionManagersByAuction: {},
  bidRedemptions: {},
  auctions: {},
  auctionDataExtended: {},
  vaults: {},
  payoutTickets: {},
  store: null,
  whitelistedCreatorsByCreator: {},
  bidderMetadataByAuctionAndBidder: {},
  bidderPotsByAuctionAndBidder: {},
  safetyDepositBoxesByVaultAndIndex: {},
  prizeTrackingTickets: {},
  safetyDepositConfigsByAuctionManagerAndIndex: {},
  bidRedemptionV2sByAuctionManagerAndWinningIndex: {},
  auctionCaches: {},
  storeIndexer: [],
  packs: {},
  packCards: {},
  packCardsByPackSet: {},
  vouchers: {},
});
