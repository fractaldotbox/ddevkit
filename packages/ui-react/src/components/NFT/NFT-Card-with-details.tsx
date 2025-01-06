import { Button } from "#components/shadcn/button.js";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "#components/shadcn/card";
import { Input } from "#components/shadcn/input.js";
import { useConfig } from "wagmi";



export const NFTCardWithDetails = ({
    contractAddress,
    tokenId
}: {
    contractAddress: string;
    tokenId: number;
}) => {
    const config = useConfig();
    return (
        <div className="p-8">
      <Card className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900">NFT Minting & Token Bound Accounts</h2>
        {/* {!isConnected ? (
          <Button onClick={() => connect()} className="mt-4 w-full">Connect Wallet</Button>
        ) : ( */}
          <>
            <Input
              type="text"
              placeholder="Enter metadata URI"
              value={mintURI}
              onChange={(e) => setMintURI(e.target.value)}
              className="mt-4"
            />
            <Button onClick={handleMint} className="mt-4 w-full">Mint NFT</Button>
            {/* {isMinted && tokenId && (
              <>
                <p className="mt-4">NFT Minted! Token ID: {tokenId}</p>
                <Button onClick={handleCreateTokenBoundAccount} className="mt-4 w-full">Create Token Bound Account</Button>
                {tokenBoundAccount && (
                  <Modal open={true} onClose={() => setTokenBoundAccount(null)}>
                    <h3 className="text-xl font-semibold text-gray-900">Token Bound Account</h3>
                    <p className="text-gray-700">Token Bound Account Address: {tokenBoundAccount}</p>
                  </Modal>
                )}
              </>
            )} */}
          </>
        {/* )} */}
      </Card>
    </div>
    )
}