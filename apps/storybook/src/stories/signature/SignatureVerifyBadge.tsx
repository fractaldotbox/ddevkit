import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Flex } from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";
import { Hex } from "viem";
import { Address } from "../identity/Address";

export const SignatureVerifyBadge = ({ signature, message, address, verify }: {
    signature: Hex,
    message: string,
    address: Hex,
    verify: (signature: Hex, message: string, address: Hex) => Promise<boolean>
}) => {

    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        if (!signature || !message || !address) {
            return;
        }

        verify(signature, message, address)
            .then(
                (isVerified: boolean) => {
                    setIsVerified(isVerified);
                }
            );

    }, [signature, message, address])

    return (
        <div>
            <div className="flex items-center space-x-2">
                <Label htmlFor="public-key">Public Key</Label>
                <div id="public-key">
                    <Address address={address} />
                </div>
            </div>

            <div>Signature: {signature} </div>
            <Flex align="center" gap="2">
                {isVerified ? '✅Verified!' : ''}
            </Flex>
        </div>
    );


}