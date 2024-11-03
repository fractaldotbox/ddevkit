import { Button } from "@/components/ui/button";

export type TokenChipProps = {
  image?: string;
  name: string;
  symbol: string;
  className?: string;
};

export const TokenChip = ({
  image,
  name,
  symbol,
  className,
}: TokenChipProps) => {
  return (
    <Button variant={"secondary"} className={`py-1 flex gap-3 ${className}`}>
      <img className="h-6" src={image} alt={`${name}-icon`} />
      <div className="text-lg font-semibold">{symbol}</div>
    </Button>
  );
};
