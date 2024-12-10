import { getLighthouseGatewayUrl } from "./lighthouse/isomorphic";

export enum IpfsGateway {
	Lighthouse = "lighthouse",
	Akave = "akave",
	IpfsIo = "ipfsio",
}

export const getGatewayUrlWithCid = (
	cid: string,
	gateway: IpfsGateway = IpfsGateway.IpfsIo,
) => {
	// TODO discuss on retrieveal, auth and optimization required
	// if (gateway === IpfsGateway.Akave) {
	// 	return "";
	// }

	if (gateway === IpfsGateway.IpfsIo) {
		return `https://ipfs.io/ipfs/${cid}`;
	}

	return getLighthouseGatewayUrl(cid);
};
