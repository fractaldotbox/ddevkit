import { AddressBadge } from "@geist/ui-react/components/identity/address-badge";
import { privateKeyToAccount } from "viem/accounts";

// Abstracted component for the story wrapper with address badge
const StoryWrapperWithAddress = ({ address, children }: { address?: string, children: React.ReactNode }) => (
  <div className="w-full top-0">
    <div className="float-right">
      {address && <AddressBadge address={address} />}
    </div>
    <div className="p-10">
      {children}
    </div>
  </div>
);

export const withWalletControl = () => {
  return (Story: any, context: any) => {
    const { privateKey } = context?.args;
    const account = privateKeyToAccount(privateKey);
    const { address } = account;

    return (
      <StoryWrapperWithAddress address={address}>
        <Story args={context.args} />
      </StoryWrapperWithAddress>
    );
  };
};

export const withWalletControlWagmi = () => {
  return (Story: any, context: any) => {
    const { account } = context?.args;
    const { address } = account;

    return (
      <StoryWrapperWithAddress address={address}>
        <Story args={context.args} />
      </StoryWrapperWithAddress>
    );
  };
};
