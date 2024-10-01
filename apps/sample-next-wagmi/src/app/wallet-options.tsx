import * as React from 'react'
import { Connector, useConnect } from 'wagmi'

export function WalletOptions() {
    const { connectors, connect } = useConnect()

    return (
        <div className="flex gap-2">
            {
                connectors.map((connector) => (
                    <WalletOption
                        key={connector.uid}
                        connector={connector}
                        onClick={() => connect({ connector })}
                    />
                ))
            }
        </div>
    )
}

function WalletOption({
    connector,
    onClick,
}: {
    connector: Connector
    onClick: () => void
}) {
    const [ready, setReady] = React.useState(false)


    React.useEffect(() => {
        ; (async () => {
            const provider = await connector.getProvider()
            setReady(!!provider)
        })()
    }, [connector])

    return (
        <button className="btn" disabled={!ready} onClick={onClick}>
            {connector.name}
        </button>
    )
}