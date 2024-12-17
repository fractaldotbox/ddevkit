import { AddressOrEns, useEnsData } from "#hooks/ens/use-efp-api.js";

export const Name = ({ addressOrEns }: { addressOrEns: AddressOrEns }) => {
	const { data, isSuccess } = useEnsData(addressOrEns);
	const name = data?.ens?.name;
	return <div>{name}</div>;
};
