import { useMemo } from "react";
import { Hex, getAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAddress } from "wagmi";
import { getShortAddress } from "../../utils/address";

export const AddrsesBadge = ({
	address,
	isShort = true,
}: {
	address: Hex;
	isShort?: boolean;
}) => {
	const addressDisplayed = useMemo(() => {
		return isShort ? getShortAddress(address) : getAddress(address);
	}, [address, isShort]);

	return <div>{addressDisplayed}</div>;
};

export const AddressBadgeFromName = ({
	name,
}: {
	name: string;
}) => {
	const result = useEnsAddress({
		name: normalize("wevm.eth"),
	});

	return <AddrsesBadge address={"0x"} />;
};
