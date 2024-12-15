import { AddressOrEns, useEnsData } from "#/hooks/use-efp-api";

export const Name = ({ addressOrEns }: { addressOrEns: AddressOrEns }) => {
	const { data, isSuccess } = useEnsData(addressOrEns);
	const name = data?.ens?.name;
	return <div>{name}</div>;
};
