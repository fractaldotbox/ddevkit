import { Chain, filecoinCalibration, mainnet } from "viem/chains";

export const createFilecoinFilfoxAddressUrl = (
	address: string,
	chainId: number,
) => {
	if (chainId === filecoinCalibration.id) {
		return "https://calibration.filfox.info/en/address/";
	}
	return "https://filfox.info/en/address/" + address;
};

export const createBlockExplorerUrl = (address: string, chain: Chain) => {
	if (chain.blockExplorers) {
		return chain.blockExplorers.default.url + "/address/" + address;
	}
	// TODO identify chains
	return "";
};
