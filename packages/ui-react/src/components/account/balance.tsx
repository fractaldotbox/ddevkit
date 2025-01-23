import { formatUnitsWithLocale } from "@geist/domain/amount";
import { Text } from "@radix-ui/themes";
// support ENS, basename
// Option to use ipfs gateway, ens metadata services
import type { Address } from "viem";
import { mainnet } from "viem/chains";
import { useBalance, useConfig, useReadContract } from "wagmi";
import { getBalance } from "wagmi/actions";
import { useTokenInfo } from "#components/token/token";
import { ABI_ERC20 } from "#lib/token/config";

type NativeTokenBalanceProps = {
	address: Address;
	chainId?: number;
	decimalsDisplayed?: number;
};

// Consider locale for https://github.com/bpierre/dnum

export const Balance = ({
	address,
	chainId = mainnet.id,
	tokenAddress,
}: {
	address: Address;
	chainId?: number;
	tokenAddress?: Address;
}) => {
	if (tokenAddress) {
		return (
			<TokenBalance
				address={address}
				chainId={chainId}
				tokenAddress={tokenAddress}
			/>
		);
	}

	return <NativeTokenBalance address={address} chainId={chainId} />;
};

export const TokenBalance = ({
	address,
	chainId = mainnet.id,
	tokenAddress,
}: {
	address: Address;
	chainId?: number;
	tokenAddress: Address;
}) => {
	const config = useConfig();

	const { data, isError, isLoading, error } = useReadContract({
		abi: ABI_ERC20,
		address: tokenAddress,
		chainId,
		functionName: "balanceOf",
		args: [address],
		account: address,
	});

	const { data: tokenInfo } = useTokenInfo({
		chainId,
		address: tokenAddress,
		config,
	});

	if (isLoading || !tokenInfo) return <Text>Loading...</Text>;
	if (isError) return <Text>Error loading balance</Text>;

	const value = data ?? BigInt(0);

	const { decimals } = tokenInfo || {};

	console.log("data", data, tokenInfo, value, decimals);
	return (
		<Text>
			{formatUnitsWithLocale({
				value,
				exponent: decimals ?? 18,
				formatOptions: {
					style: "currency",
					maximumFractionDigits: 4,
				},
			})}{" "}
		</Text>
	);
};

export const NativeTokenBalance = ({
	address,
	chainId = mainnet.id,
	decimalsDisplayed = 4,
}: NativeTokenBalanceProps) => {
	const { data, isError, isLoading } = useBalance({
		address,
		chainId,
	});

	if (isError) return <Text>Error loading balance</Text>;
	if (isLoading || !data) return <Text>Loading...</Text>;

	const value = data?.value ?? BigInt(0);

	return (
		<Text>
			{formatUnitsWithLocale({
				value,
				exponent: data?.decimals ?? 18,
				formatOptions: {
					maximumFractionDigits: decimalsDisplayed,
				},
			})}{" "}
			{data?.symbol}
		</Text>
	);
};
