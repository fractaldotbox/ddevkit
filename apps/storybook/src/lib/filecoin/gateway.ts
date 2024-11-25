import { getLighthouseGatewayUrl } from "./lighthouse/isomorphic";

export enum FilecoinGateway {
	Lighthouse = "lighthouse",
	Akave = "akave",
}

export const getGatewayUrlWithCid = (
	cid: string,
	gateway: FilecoinGateway = FilecoinGateway.Lighthouse,
) => {
	// TODO discuss on retrieveal, auth and optimization required
	// if (gateway === FilecoinGateway.Akave) {
	// 	return "";
	// }

	return getLighthouseGatewayUrl(cid);
};
