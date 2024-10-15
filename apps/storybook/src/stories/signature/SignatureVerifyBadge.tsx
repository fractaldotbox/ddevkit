import { Label } from "@/components/ui/label";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Hex, Address as AddressType } from "viem";
import { Address } from "../identity/Address";

export const SignatureVerifyBadge = ({
    signature,
    message,
    address,
    verify,
}: {
    signature: Hex;
    message: any;
    address: AddressType;
    verify: ({
        address,
        message,
        signature,
    }: {
        address: AddressType;
        message: any;
        signature: Hex;
    }) => Promise<boolean>;
}) => {
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        if (!signature || !message || !address) {
            return;
        }

        verify({ signature, message, address }).then((isVerified: boolean) => {
            setIsVerified(isVerified);
        });
    }, [signature, message, address]);

    return (
        <div>
            <div className="flex items-center space-x-2">
                <Label htmlFor="public-key">Public Key</Label>
                <div id="public-key">
                    <Address address={address} />
                </div>
            </div>
            <div className="font-xs break-all">Signature: {signature} </div>
            <Flex align="center" gap="2">
                {isVerified ? "✅Verified!" : ""}
            </Flex>
        </div>
    );
};
