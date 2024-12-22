import { GatewayStrategy } from "./gateway-strategy";
import { getLighthouseGatewayUrl } from "./lighthouse/isomorphic";

export enum IpfsGateway {
	Lighthouse = "lighthouse",
	Akave = "akave",
	IpfsIo = "ipfsio",
}

// TODO discuss on retrieval for akave, auth and optimization required

export const getIpfsGatewayUrl = (cid: string) => `https://ipfs.io/ipfs/${cid}`;

export const GATEWAY_STRAETGIES_BY_GATEWAY = {
	[IpfsGateway.Lighthouse]: getLighthouseGatewayUrl,
	[IpfsGateway.IpfsIo]: getIpfsGatewayUrl,
} as Record<IpfsGateway, GatewayStrategy>;

export const getGatewayUrlWithCid = (
	cid: string,
	gateway: IpfsGateway = IpfsGateway.IpfsIo,
) => {
	const strategy = GATEWAY_STRAETGIES_BY_GATEWAY[gateway] || getIpfsGatewayUrl;

	return strategy(cid);
};
