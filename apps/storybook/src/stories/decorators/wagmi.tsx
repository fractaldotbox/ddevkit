import { WagmiProvider } from "wagmi";
import { WAGMI_CONFIG } from "../../utils/wagmi-config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



// TODO fix Story type


const QueryClientProviderWrapper = ({ children }: { children: React.ReactNode }) => {

    return (
        <QueryClientProvider client={new QueryClient()}>
            <div>
                {children}
            </div>
        </QueryClientProvider>
    )
}

export const withQueryClientProvider = () => {

    return (Story: any) => (
        <div>
            <QueryClientProviderWrapper >
                <Story />
            </QueryClientProviderWrapper>

        </div>
    )
}


export const withWagmiProvider = () => {
    return (Story: any) => (
        <div>
            <QueryClientProviderWrapper >
                <WagmiProvider config={WAGMI_CONFIG}>
                    <Story />
                </WagmiProvider>
            </QueryClientProviderWrapper>

        </div>
    )
}