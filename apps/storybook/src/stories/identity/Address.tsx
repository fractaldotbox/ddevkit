import { getAddress, Hex } from 'viem';
import { useEnsAddress } from 'wagmi';
import { normalize } from 'viem/ens'
import { getShortAddress } from '../../utils/address';
import { useMemo } from 'react';


export const Address = ({ address, isShort = true }: {
    address: Hex,
    isShort?: boolean
}) => {
    const addressDisplayed = useMemo(() => {
        return isShort ? getShortAddress(address) : getAddress(address);
    }, [address, isShort])

    return (
        <div>
            {addressDisplayed}
        </div>
    )
}

export const AddressFromName = ({ name }: {
    name: string
}) => {

    const result = useEnsAddress({
        name: normalize('wevm.eth'),
    })

    return (
        <Address address={'0x'} />
    )
}