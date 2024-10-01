import { http, createConfig } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { injected  } from 'wagmi/connectors'


export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})


