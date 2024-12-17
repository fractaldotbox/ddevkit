import { AddressOrEns, useEnsData } from "../ens/use-efp-api";

export enum MetadataService {
	Efp = "efp",
	EnsGraph = "ens-graph",
}

export const useIdentity = (
	addressOrEns: AddressOrEns,
	metadataService: MetadataService = MetadataService.Efp,
) => {
	if (metadataService === MetadataService.Efp) {
		const results = useEnsData(addressOrEns);

		return {
			avatarSrc: results.data?.ens.avatar,
			...results,
		};
	}
	// TODO
	const results = useEnsData(addressOrEns);

	return {
		avatarSrc: results.data?.ens.avatar,
		...results,
	};
};
