import { WagmiProvider } from "wagmi";
import { WAGMI_CONFIG } from "../../utils/wagmi-config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



// TODO fix Story type
export const withWagmiProvider = () => {
    const queryClient = new QueryClient()

    return (Story: any) => (
        <div>
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={WAGMI_CONFIG}>
                    <Story />
                </WagmiProvider>
            </QueryClientProvider>
        </div>
    )
}