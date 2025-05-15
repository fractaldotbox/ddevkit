import {
	createContext,
	useContext,
	useMemo,
	type PropsWithChildren,
} from "react";
import type { Address } from "viem";
import type { NFTCardType } from "../types";
import { useGetSingleNFTMetadata } from "#hooks/data/use-blockscout.js";
import type { NFTResponse } from "#lib/blockscout/types.js";

export type NFTContextType = {
	nftData: NFTResponse | undefined;
	loading: boolean;
	error: Error | null;
};

export const NFTContext = createContext<NFTContextType>(undefined as never);

export const NFTProvider = ({
	children,
	contractAddress,
	tokenId,
}: PropsWithChildren<NFTCardType>) => {
	const {
		data: nftData,
		isLoading: loading,
		error,
	} = useGetSingleNFTMetadata(contractAddress, tokenId);

	const value = useMemo(
		() => ({ nftData: nftData, loading, error }),
		[nftData, loading, error],
	);

	return <NFTContext.Provider value={value}>{children}</NFTContext.Provider>;
};

export const useNFT = () => {
	const context = useContext(NFTContext);
	if (!context) {
		throw new Error("useNFT must be used within a NFTProvider");
	}
	return context;
};
