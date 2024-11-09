import { getAddress, Hex } from "viem";
import { useEnsAddress } from "wagmi";
import { normalize } from "viem/ens";
import { getShortAddress } from "../../utils/address";
import { useMemo, useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@radix-ui/themes";
import { Check, Copy } from "lucide-react";

export const Address = ({
  address,
  isShort = true,
}: {
  address: Hex;
  isShort?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getAddress(address));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addressDisplayed = useMemo(() => {
    return isShort ? getShortAddress(address) : getAddress(address);
  }, [address, isShort]);

  return (
    <div className="flex gap-2 items-center">
      <div>{addressDisplayed}</div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={copyToClipboard} className="cursor-pointer">
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : "Click to copy"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const AddressFromName = ({ name }: { name: string }) => {
  const result = useEnsAddress({
    name: normalize("wevm.eth"),
  });

  return <Address address={"0x"} />;
};
