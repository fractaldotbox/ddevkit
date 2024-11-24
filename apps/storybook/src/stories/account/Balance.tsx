// support ENS, basename
// Option to use ipfs gateway, ens metadata services
import React, { useEffect, useState } from 'react';
import { Text } from '@radix-ui/themes';
import { useAccount, useBalance, useReadContract, useToken } from 'wagmi';
import { Address, Chain, formatUnits } from 'viem';
import { mainnet } from 'viem/chains'
import { ABI_ERC20 } from '../../utils/config';
import { formatUnitsWithDecimalsDisplayed } from '@/lib/amount';


type ETHBalanceProps = {
    address: Address,
    chainId?: number,
    decimalsDisplayed: number
}


// Consider locale for https://github.com/bpierre/dnum

export const ETHBalance = ({
    address,
    chainId = mainnet.id,
    decimalsDisplayed = 4
}: ETHBalanceProps) => {

    const { data, isError, isLoading } = useBalance({
        address,
        chainId,
    });



    if (isError) return <Text>Error loading balance</Text>;
    if (isLoading || !data) return <Text>Loading...</Text>;

    return (
        <Text>
            {formatUnitsWithDecimalsDisplayed(data, decimalsDisplayed)} {data?.symbol}
        </Text >
    );

}


export const Balance = ({
    address,
    chainId = mainnet.id,
    token
}: {
    address: Address,
    chainId?: number,
    token?: Address
}) => {

    if (token) {
        return <TokenBalance address={address} chainId={chainId} token={token} />
    }

    return <ETHBalance address={address} chainId={chainId} />

}

export const TokenBalance = ({
    address,
    chainId = mainnet.id,
    token
}: {
    address: Address,
    chainId?: number,
    token?: Address
}) => {


    const { data, isError, isLoading } = useReadContract({
        abi: ABI_ERC20,
        address: token,
        chainId,
        functionName: 'balanceOf',
        args: [address],
        account: address,
    });

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error loading balance</Text>;

    return (
        <Text>
            {data?.toString()}
        </Text >
    );
}