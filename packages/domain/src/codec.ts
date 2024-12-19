import { CID, MultihashDigest } from "multiformats";

export const isCID = (cid: string) => {
	try {
		CID.parse(cid);
		return true;
	} catch {
		return false;
	}
};
