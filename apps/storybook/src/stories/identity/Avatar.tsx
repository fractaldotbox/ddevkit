// support ENS, basename
// Option to use ipfs gateway, ens metadata services

import * as AvatarRadix from '@radix-ui/react-avatar';

export const Avatar = () => (
    <AvatarRadix.Root>
        <AvatarRadix.Image />
        <AvatarRadix.Fallback />
    </AvatarRadix.Root>
);