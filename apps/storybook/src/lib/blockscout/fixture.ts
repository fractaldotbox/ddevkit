import { faker } from "@faker-js/faker";

export const TXN_VITALIK_DEPOSIT = {
  priority_fee: "159234328090670",
  tx_burnt_fee: "792939171909330",
  raw_input:
    "0xe0db3fcf0000000000000000000000005c7bcd6e7de5423a257d81b442095a1a6ced35c5000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000001bc3a5d675c41000000000000000000000000000000000000000000000000000000000000000021050000000000000000000000000000000000000000000000000000448c7669826500000000000000000000000000000000000000000000000000000000673c6b170000000000000000000000000000000000000000000000000000000000000120ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000001dc0de0000",
  result: "success",
  hash: "0x31634ddc4975cc9f2c3c6426034fe0ed30163000cd067e80857136ab86dc0a3b",
  max_fee_per_gas: "13100000000",
  revert_reason: null,
  confirmation_duration: [0, 12242],
  type: 2,
  token_transfers_overflow: false,
  confirmations: 15522,
  position: 113,
  max_priority_fee_per_gas: "2655878430",
  transaction_tag: null,
  created_contract: null,
  value: "32010000000000000000",
  tx_types: ["coin_transfer", "contract_call", "token_transfer"],
  from: {
    ens_domain_name: "vitalik.eth",
    hash: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    implementations: [],
    is_contract: false,
    is_scam: false,
    is_verified: false,
    metadata: {
      tags: [
        {
          meta: {
            bgColor: "#8465CB",
            tagIcon:
              "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%2032%2029%22%3E%3Cpath%20d%3D%22M%205.507%200.072%20L%2026.097%200.072%20L%2026.097%204.167%20L%2031.952%204.167%20L%2030.725%208.263%20L%2029.686%208.263%20L%2029.686%2024.833%20C%2030.207%2024.833%2030.63%2025.249%2030.63%2025.763%20L%2030.63%2026.88%20L%2030.819%2026.88%20C%2031.341%2026.88%2031.764%2027.297%2031.764%2027.811%20L%2031.764%2028.928%20L%2021.185%2028.928%20L%2021.185%2027.811%20C%2021.185%2027.297%2021.608%2026.88%2022.13%2026.88%20L%2022.319%2026.88%20L%2022.319%2025.763%20C%2022.319%2025.316%2022.639%2024.943%2023.065%2024.853%20L%2023.045%2015.71%20C%2022.711%2012.057%2019.596%209.194%2015.802%209.194%20C%2012.008%209.194%208.893%2012.057%208.559%2015.71%20L%208.539%2024.845%20C%209.043%2024.919%209.663%2025.302%209.663%2025.763%20L%209.663%2026.88%20L%209.852%2026.88%20C%2010.373%2026.88%2010.796%2027.297%2010.796%2027.811%20L%2010.796%2028.928%20L%200.218%2028.928%20L%200.218%2027.811%20C%200.218%2027.297%200.641%2026.88%201.162%2026.88%20L%201.351%2026.88%20L%201.351%2025.763%20C%201.351%2025.249%201.774%2024.833%202.296%2024.833%20L%202.296%208.263%20L%201.257%208.263%20L%200.029%204.167%20L%205.507%204.167%20L%205.507%200.072%20Z%22%20fill%3D%22rgb(255%2C%20255%2C%20255)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M%2026.097%200.072%20L%2026.166%200.072%20L%2026.166%200.004%20L%2026.097%200.004%20Z%20M%205.507%200.072%20L%205.507%200.004%20L%205.438%200.004%20L%205.438%200.072%20Z%20M%2026.097%204.167%20L%2026.028%204.167%20L%2026.028%204.235%20L%2026.097%204.235%20Z%20M%2031.952%204.167%20L%2032.019%204.187%20L%2032.045%204.099%20L%2031.952%204.099%20L%2031.952%204.167%20Z%20M%2030.725%208.263%20L%2030.725%208.331%20L%2030.776%208.331%20L%2030.791%208.282%20Z%20M%2029.686%208.263%20L%2029.686%208.195%20L%2029.617%208.195%20L%2029.617%208.263%20Z%20M%2029.686%2024.833%20L%2029.617%2024.833%20L%2029.617%2024.901%20L%2029.686%2024.901%20Z%20M%2030.63%2026.88%20L%2030.561%2026.88%20L%2030.561%2026.948%20L%2030.63%2026.948%20Z%20M%2031.764%2028.928%20L%2031.764%2028.996%20L%2031.832%2028.996%20L%2031.832%2028.928%20Z%20M%2021.185%2028.928%20L%2021.116%2028.928%20L%2021.116%2028.996%20L%2021.185%2028.996%20Z%20M%2022.319%2026.88%20L%2022.319%2026.948%20L%2022.388%2026.948%20L%2022.388%2026.88%20Z%20M%2023.065%2024.853%20L%2023.08%2024.919%20L%2023.134%2024.908%20L%2023.134%2024.853%20Z%20M%2023.045%2015.71%20L%2023.114%2015.71%20L%2023.114%2015.707%20L%2023.113%2015.704%20Z%20M%208.559%2015.71%20L%208.49%2015.704%20L%208.49%2015.707%20L%208.49%2015.71%20Z%20M%208.539%2024.845%20L%208.47%2024.845%20L%208.469%2024.904%20L%208.528%2024.913%20Z%20M%209.663%2026.88%20L%209.594%2026.88%20L%209.594%2026.948%20L%209.663%2026.948%20Z%20M%2010.796%2028.928%20L%2010.796%2028.996%20L%2010.865%2028.996%20L%2010.865%2028.928%20Z%20M%200.218%2028.928%20L%200.149%2028.928%20L%200.149%2028.996%20L%200.218%2028.996%20Z%20M%201.351%2026.88%20L%201.351%2026.948%20L%201.42%2026.948%20L%201.42%2026.88%20Z%20M%202.296%2024.833%20L%202.296%2024.901%20L%202.365%2024.901%20L%202.365%2024.833%20Z%20M%202.296%208.263%20L%202.365%208.263%20L%202.365%208.195%20L%202.296%208.195%20Z%20M%201.257%208.263%20L%201.191%208.282%20L%201.205%208.331%20L%201.257%208.331%20Z%20M%200.029%204.167%20L%200.029%204.1%20L%20-0.063%204.1%20L%20-0.037%204.187%20L%200.029%204.167%20Z%20M%205.507%204.167%20L%205.507%204.235%20L%205.576%204.235%20L%205.576%204.167%20Z%20M%2026.097%200.004%20L%205.507%200.004%20L%205.507%200.139%20L%2026.097%200.139%20Z%20M%2026.166%204.167%20L%2026.166%200.072%20L%2026.028%200.072%20L%2026.028%204.167%20L%2026.166%204.167%20Z%20M%2031.952%204.099%20L%2026.097%204.099%20L%2026.097%204.235%20L%2031.952%204.235%20Z%20M%2030.791%208.282%20L%2032.019%204.187%20L%2031.886%204.148%20L%2030.658%208.244%20Z%20M%2029.686%208.331%20L%2030.725%208.331%20L%2030.725%208.195%20L%2029.686%208.195%20Z%20M%2029.755%2024.833%20L%2029.755%208.263%20L%2029.617%208.263%20L%2029.617%2024.833%20Z%20M%2030.699%2025.763%20C%2030.699%2025.212%2030.245%2024.765%2029.686%2024.765%20L%2029.686%2024.9%20C%2030.169%2024.9%2030.561%2025.287%2030.561%2025.763%20Z%20M%2030.699%2026.88%20L%2030.699%2025.763%20L%2030.561%2025.763%20L%2030.561%2026.88%20Z%20M%2030.819%2026.813%20L%2030.63%2026.813%20L%2030.63%2026.948%20L%2030.819%2026.948%20Z%20M%2031.832%2027.811%20C%2031.832%2027.26%2031.379%2026.813%2030.819%2026.813%20L%2030.819%2026.948%20C%2031.303%2026.948%2031.695%2027.335%2031.695%2027.811%20Z%20M%2031.832%2028.928%20L%2031.832%2027.811%20L%2031.695%2027.811%20L%2031.695%2028.928%20Z%20M%2026.097%2028.996%20L%2031.764%2028.996%20L%2031.764%2028.86%20L%2026.097%2028.86%20Z%20M%2023.074%2028.996%20L%2026.097%2028.996%20L%2026.097%2028.86%20L%2023.074%2028.86%20Z%20M%2021.185%2028.996%20L%2023.074%2028.996%20L%2023.074%2028.86%20L%2021.185%2028.86%20Z%20M%2021.116%2027.811%20L%2021.116%2028.928%20L%2021.254%2028.928%20L%2021.254%2027.811%20Z%20M%2022.13%2026.813%20C%2021.57%2026.813%2021.116%2027.26%2021.116%2027.811%20L%2021.254%2027.811%20C%2021.254%2027.335%2021.646%2026.948%2022.13%2026.948%20Z%20M%2022.319%2026.813%20L%2022.13%2026.813%20L%2022.13%2026.948%20L%2022.319%2026.948%20Z%20M%2022.25%2025.763%20L%2022.25%2026.88%20L%2022.388%2026.88%20L%2022.388%2025.763%20Z%20M%2023.051%2024.787%20C%2022.593%2024.883%2022.25%2025.284%2022.25%2025.763%20L%2022.388%2025.763%20C%2022.388%2025.349%2022.684%2025.003%2023.08%2024.919%20Z%20M%2022.976%2015.71%20L%2022.996%2024.853%20L%2023.134%2024.853%20L%2023.114%2015.71%20Z%20M%2015.802%209.262%20C%2019.559%209.262%2022.645%2012.098%2022.976%2015.716%20L%2023.113%2015.704%20C%2022.776%2012.016%2019.632%209.126%2015.802%209.126%20Z%20M%208.628%2015.716%20C%208.959%2012.098%2012.044%209.262%2015.802%209.262%20L%2015.802%209.126%20C%2011.972%209.126%208.828%2012.016%208.49%2015.704%20Z%20M%208.608%2024.845%20L%208.628%2015.71%20L%208.49%2015.71%20L%208.47%2024.845%20Z%20M%209.732%2025.763%20C%209.732%2025.502%209.557%2025.273%209.331%2025.105%20C%209.104%2024.935%208.812%2024.817%208.549%2024.778%20L%208.528%2024.912%20C%208.769%2024.948%209.039%2025.057%209.248%2025.213%20C%209.459%2025.37%209.594%2025.563%209.594%2025.763%20Z%20M%209.732%2026.88%20L%209.732%2025.763%20L%209.594%2025.763%20L%209.594%2026.88%20Z%20M%209.852%2026.813%20L%209.663%2026.813%20L%209.663%2026.948%20L%209.852%2026.948%20Z%20M%2010.865%2027.811%20C%2010.865%2027.26%2010.411%2026.813%209.852%2026.813%20L%209.852%2026.948%20C%2010.335%2026.948%2010.727%2027.335%2010.727%2027.811%20Z%20M%2010.865%2028.928%20L%2010.865%2027.811%20L%2010.727%2027.811%20L%2010.727%2028.928%20Z%20M%208.529%2028.996%20L%2010.796%2028.996%20L%2010.796%2028.86%20L%208.529%2028.86%20Z%20M%208.372%2028.996%20L%208.529%2028.996%20L%208.529%2028.86%20L%208.372%2028.86%20Z%20M%205.507%2028.996%20L%208.372%2028.996%20L%208.372%2028.86%20L%205.507%2028.86%20Z%20M%200.218%2028.996%20L%205.507%2028.996%20L%205.507%2028.86%20L%200.218%2028.86%20Z%20M%200.149%2027.811%20L%200.149%2028.928%20L%200.287%2028.928%20L%200.287%2027.811%20Z%20M%201.162%2026.813%20C%200.603%2026.813%200.149%2027.26%200.149%2027.811%20L%200.287%2027.811%20C%200.287%2027.335%200.679%2026.948%201.162%2026.948%20Z%20M%201.351%2026.813%20L%201.162%2026.813%20L%201.162%2026.948%20L%201.351%2026.948%20Z%20M%201.282%2025.763%20L%201.282%2026.88%20L%201.42%2026.88%20L%201.42%2025.763%20Z%20M%202.296%2024.765%20C%201.736%2024.765%201.282%2025.212%201.282%2025.763%20L%201.42%2025.763%20C%201.42%2025.287%201.812%2024.9%202.296%2024.9%20Z%20M%202.227%208.263%20L%202.227%2024.833%20L%202.365%2024.833%20L%202.365%208.263%20Z%20M%201.257%208.331%20L%202.296%208.331%20L%202.296%208.195%20L%201.257%208.195%20Z%20M%20-0.037%204.187%20L%201.191%208.282%20L%201.323%208.244%20L%200.095%204.148%20Z%20M%205.507%204.099%20L%200.029%204.099%20L%200.029%204.235%20L%205.507%204.235%20L%205.507%204.099%20Z%20M%205.438%200.072%20L%205.438%204.167%20L%205.576%204.167%20L%205.576%200.072%20Z%22%20fill%3D%22rgb(255%2C255%2C255)%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
            tagUrl: "https://warpcast.com/vitalik.eth",
            textColor: "#FFFFFF",
            tooltipDescription: "This address is linked to a Farcaster account",
            warpcastHandle: "vitalik.eth",
          },
          name: "Farcaster",
          ordinal: 5,
          slug: "warpcast-account",
          tagType: "classifier",
        },
        {
          meta: {},
          name: "Gitcoin Grantee",
          ordinal: 0,
          slug: "gitcoin-grantee",
          tagType: "generic",
        },
        {
          meta: {},
          name: "Vitalik Buterin",
          ordinal: 10,
          slug: "vitalik-buterin",
          tagType: "name",
        },
      ],
    },
    name: null,
    private_tags: [],
    proxy_type: null,
    public_tags: [],
    watchlist_names: [],
  },
  gas_used: "72685",
  status: "ok",
  to: {
    ens_domain_name: null,
    hash: "0xB4A8d45647445EA9FC3E1058096142390683dBC2",
    implementations: [],
    is_contract: true,
    is_scam: false,
    is_verified: true,
    metadata: null,
    name: "SpokePoolVerifier",
    private_tags: [],
    proxy_type: "unknown",
    public_tags: [],
    watchlist_names: [],
  },
  authorization_list: [],
  method: "deposit",
  fee: {
    type: "actual",
    value: "952173500000000",
  },
  tx_tag: null,
  actions: [],
  gas_limit: "118529",
  gas_price: "13100000000",
  decoded_input: {
    method_call:
      "deposit(address spokePool, address recipient, address originToken, uint256 amount, uint256 destinationChainId, int64 relayerFeePct, uint32 quoteTimestamp, bytes message, uint256 maxCount)",
    method_id: "e0db3fcf",
    parameters: [
      {
        name: "spokePool",
        type: "address",
        value: "0x5c7BCd6E7De5423a257D81B442095A1a6ced35C5",
      },
      {
        name: "recipient",
        type: "address",
        value: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      },
      {
        name: "originToken",
        type: "address",
        value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
      {
        name: "amount",
        type: "uint256",
        value: "32010000000000000000",
      },
      {
        name: "destinationChainId",
        type: "uint256",
        value: "8453",
      },
      {
        name: "relayerFeePct",
        type: "int64",
        value: "75370072736357",
      },
      {
        name: "quoteTimestamp",
        type: "uint32",
        value: "1732012823",
      },
      {
        name: "message",
        type: "bytes",
        value: "0x",
      },
      {
        name: "maxCount",
        type: "uint256",
        value:
          "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      },
    ],
  },
  has_error_in_internal_txs: false,
  token_transfers: [
    {
      block_hash:
        "0x6979e04f00a50fe16257215627086f374029eff221a37cff627a6068a7aced51",
      block_number: 21221256,
      from: {
        ens_domain_name: null,
        hash: "0x0000000000000000000000000000000000000000",
        implementations: [],
        is_contract: false,
        is_scam: false,
        is_verified: false,
        metadata: {
          tags: [
            {
              meta: {},
              name: "Metamask User",
              ordinal: 0,
              slug: "metamask-user",
              tagType: "generic",
            },
            {
              meta: {
                alertStatus: "info",
                data: "This address is not owned by any user, is often associated with token burn & mint/genesis events and used as a generic null address",
              },
              name: "note_0",
              ordinal: 0,
              slug: "note0",
              tagType: "note",
            },
            {
              meta: {},
              name: "Burn",
              ordinal: 0,
              slug: "burn",
              tagType: "generic",
            },
            {
              meta: {},
              name: "Null: 0x000...000",
              ordinal: 10,
              slug: "null-0x000000",
              tagType: "name",
            },
            {
              meta: {},
              name: "Imtoken User",
              ordinal: 0,
              slug: "imtoken-user",
              tagType: "generic",
            },
            {
              meta: {},
              name: "Miner",
              ordinal: 0,
              slug: "miner",
              tagType: "generic",
            },
            {
              meta: {},
              name: "Null Address",
              ordinal: 10,
              slug: "null-address",
              tagType: "name",
            },
            {
              meta: {},
              name: "Null",
              ordinal: 0,
              slug: "null",
              tagType: "protocol",
            },
            {
              meta: {},
              name: "BLOCKED",
              ordinal: 0,
              slug: "blocked",
              tagType: "generic",
            },
            {
              meta: {},
              name: "Genesis",
              ordinal: 0,
              slug: "genesis",
              tagType: "generic",
            },
          ],
        },
        name: null,
        private_tags: [],
        proxy_type: "unknown",
        public_tags: [],
        watchlist_names: [],
      },
      log_index: 422,
      method: null,
      timestamp: null,
      to: {
        ens_domain_name: null,
        hash: "0x5c7BCd6E7De5423a257D81B442095A1a6ced35C5",
        implementations: [
          {
            address: "0x48Dcf75EA18233BA947E4480dCd70594720449C1",
            name: "Ethereum_SpokePool",
          },
        ],
        is_contract: true,
        is_scam: false,
        is_verified: true,
        metadata: {
          tags: [
            {
              meta: {},
              name: "Across Protocol: Ethereum Spoke Pool V2",
              ordinal: 10,
              slug: "across-protocol-ethereum-spoke-pool-v2",
              tagType: "name",
            },
            {
              meta: {
                bgColor: "#2F3237",
                tagIcon:
                  "https://blockscout-content.s3.amazonaws.com/across-protocol.svg",
                tagUrl: "https://across.to/bridge?utm_source=Blockscout",
                textColor: "#6DF8D7",
                tooltipDescription:
                  "Bridging method that combines an optimistic oracle, bonded relayers and single-sided liquidity pools to provide decentralized instant transactions from rollup chains to Ethereum mainnet.",
                tooltipTitle: "Across Protocol",
                tooltipUrl: "https://across.to/bridge",
              },
              name: "Across Protocol",
              ordinal: 0,
              slug: "across-protocol",
              tagType: "protocol",
            },
            {
              meta: {
                bgColor: "#6DF8D7",
                textColor: "#2F3237",
              },
              name: "Across Protocol: Spoke Pool",
              ordinal: 10,
              slug: "across-protocol-spoke-pool",
              tagType: "name",
            },
          ],
        },
        name: "ERC1967Proxy",
        private_tags: [],
        proxy_type: "eip1967",
        public_tags: [],
        watchlist_names: [],
      },
      token: {
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        circulating_market_cap: "9676244462.070765",
        decimals: "18",
        exchange_rate: "3368.6",
        holders: "1151470",
        icon_url:
          "https://assets.coingecko.com/coins/images/2518/small/weth.png?1696503332",
        name: "Wrapped Ether",
        symbol: "WETH",
        total_supply: "2879560377381669569860630",
        type: "ERC-20",
        volume_24h: "1348742956.3707833",
      },
      total: {
        decimals: "18",
        value: "32010000000000000000",
      },
      transaction_hash:
        "0x31634ddc4975cc9f2c3c6426034fe0ed30163000cd067e80857136ab86dc0a3b",
      tx_hash:
        "0x31634ddc4975cc9f2c3c6426034fe0ed30163000cd067e80857136ab86dc0a3b",
      type: "token_minting",
    },
  ],
  base_fee_per_gas: "10909254618",
  timestamp: "2024-11-19T10:43:35.000000Z",
  nonce: 1427,
  block: 21221256,
  transaction_types: ["coin_transfer", "contract_call", "token_transfer"],
  exchange_rate: "3354.67",
  block_number: 21221256,
  has_error_in_internal_transactions: false,
};

export const TXN_VITALIK_TRANSFER = {
  priority_fee: "20370000000000",
  tx_burnt_fee: "206773321797000",
  raw_input: "0x",
  result: "success",
  hash: "0xed46c306a58821dd2dcbc78d7b7af9715c809c71d7a53b0dfc90c42dfdf59b67",
  max_fee_per_gas: "11000000000",
  revert_reason: null,
  confirmation_duration: [0, 12000],
  type: 2,
  token_transfers_overflow: false,
  confirmations: 169553,
  position: 88,
  max_priority_fee_per_gas: "970000000",
  transaction_tag: null,
  created_contract: null,
  value: "100000000000000000000",
  tx_types: ["coin_transfer"],
  from: {
    ens_domain_name: "vitalik.eth",
    hash: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    implementations: [],
    is_contract: false,
    is_scam: false,
    is_verified: false,
    metadata: {
      tags: [
        {
          meta: {
            bgColor: "#8465CB",
            tagIcon:
              "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%2032%2029%22%3E%3Cpath%20d%3D%22M%205.507%200.072%20L%2026.097%200.072%20L%2026.097%204.167%20L%2031.952%204.167%20L%2030.725%208.263%20L%2029.686%208.263%20L%2029.686%2024.833%20C%2030.207%2024.833%2030.63%2025.249%2030.63%2025.763%20L%2030.63%2026.88%20L%2030.819%2026.88%20C%2031.341%2026.88%2031.764%2027.297%2031.764%2027.811%20L%2031.764%2028.928%20L%2021.185%2028.928%20L%2021.185%2027.811%20C%2021.185%2027.297%2021.608%2026.88%2022.13%2026.88%20L%2022.319%2026.88%20L%2022.319%2025.763%20C%2022.319%2025.316%2022.639%2024.943%2023.065%2024.853%20L%2023.045%2015.71%20C%2022.711%2012.057%2019.596%209.194%2015.802%209.194%20C%2012.008%209.194%208.893%2012.057%208.559%2015.71%20L%208.539%2024.845%20C%209.043%2024.919%209.663%2025.302%209.663%2025.763%20L%209.663%2026.88%20L%209.852%2026.88%20C%2010.373%2026.88%2010.796%2027.297%2010.796%2027.811%20L%2010.796%2028.928%20L%200.218%2028.928%20L%200.218%2027.811%20C%200.218%2027.297%200.641%2026.88%201.162%2026.88%20L%201.351%2026.88%20L%201.351%2025.763%20C%201.351%2025.249%201.774%2024.833%202.296%2024.833%20L%202.296%208.263%20L%201.257%208.263%20L%200.029%204.167%20L%205.507%204.167%20L%205.507%200.072%20Z%22%20fill%3D%22rgb(255%2C%20255%2C%20255)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M%2026.097%200.072%20L%2026.166%200.072%20L%2026.166%200.004%20L%2026.097%200.004%20Z%20M%205.507%200.072%20L%205.507%200.004%20L%205.438%200.004%20L%205.438%200.072%20Z%20M%2026.097%204.167%20L%2026.028%204.167%20L%2026.028%204.235%20L%2026.097%204.235%20Z%20M%2031.952%204.167%20L%2032.019%204.187%20L%2032.045%204.099%20L%2031.952%204.099%20L%2031.952%204.167%20Z%20M%2030.725%208.263%20L%2030.725%208.331%20L%2030.776%208.331%20L%2030.791%208.282%20Z%20M%2029.686%208.263%20L%2029.686%208.195%20L%2029.617%208.195%20L%2029.617%208.263%20Z%20M%2029.686%2024.833%20L%2029.617%2024.833%20L%2029.617%2024.901%20L%2029.686%2024.901%20Z%20M%2030.63%2026.88%20L%2030.561%2026.88%20L%2030.561%2026.948%20L%2030.63%2026.948%20Z%20M%2031.764%2028.928%20L%2031.764%2028.996%20L%2031.832%2028.996%20L%2031.832%2028.928%20Z%20M%2021.185%2028.928%20L%2021.116%2028.928%20L%2021.116%2028.996%20L%2021.185%2028.996%20Z%20M%2022.319%2026.88%20L%2022.319%2026.948%20L%2022.388%2026.948%20L%2022.388%2026.88%20Z%20M%2023.065%2024.853%20L%2023.08%2024.919%20L%2023.134%2024.908%20L%2023.134%2024.853%20Z%20M%2023.045%2015.71%20L%2023.114%2015.71%20L%2023.114%2015.707%20L%2023.113%2015.704%20Z%20M%208.559%2015.71%20L%208.49%2015.704%20L%208.49%2015.707%20L%208.49%2015.71%20Z%20M%208.539%2024.845%20L%208.47%2024.845%20L%208.469%2024.904%20L%208.528%2024.913%20Z%20M%209.663%2026.88%20L%209.594%2026.88%20L%209.594%2026.948%20L%209.663%2026.948%20Z%20M%2010.796%2028.928%20L%2010.796%2028.996%20L%2010.865%2028.996%20L%2010.865%2028.928%20Z%20M%200.218%2028.928%20L%200.149%2028.928%20L%200.149%2028.996%20L%200.218%2028.996%20Z%20M%201.351%2026.88%20L%201.351%2026.948%20L%201.42%2026.948%20L%201.42%2026.88%20Z%20M%202.296%2024.833%20L%202.296%2024.901%20L%202.365%2024.901%20L%202.365%2024.833%20Z%20M%202.296%208.263%20L%202.365%208.263%20L%202.365%208.195%20L%202.296%208.195%20Z%20M%201.257%208.263%20L%201.191%208.282%20L%201.205%208.331%20L%201.257%208.331%20Z%20M%200.029%204.167%20L%200.029%204.1%20L%20-0.063%204.1%20L%20-0.037%204.187%20L%200.029%204.167%20Z%20M%205.507%204.167%20L%205.507%204.235%20L%205.576%204.235%20L%205.576%204.167%20Z%20M%2026.097%200.004%20L%205.507%200.004%20L%205.507%200.139%20L%2026.097%200.139%20Z%20M%2026.166%204.167%20L%2026.166%200.072%20L%2026.028%200.072%20L%2026.028%204.167%20L%2026.166%204.167%20Z%20M%2031.952%204.099%20L%2026.097%204.099%20L%2026.097%204.235%20L%2031.952%204.235%20Z%20M%2030.791%208.282%20L%2032.019%204.187%20L%2031.886%204.148%20L%2030.658%208.244%20Z%20M%2029.686%208.331%20L%2030.725%208.331%20L%2030.725%208.195%20L%2029.686%208.195%20Z%20M%2029.755%2024.833%20L%2029.755%208.263%20L%2029.617%208.263%20L%2029.617%2024.833%20Z%20M%2030.699%2025.763%20C%2030.699%2025.212%2030.245%2024.765%2029.686%2024.765%20L%2029.686%2024.9%20C%2030.169%2024.9%2030.561%2025.287%2030.561%2025.763%20Z%20M%2030.699%2026.88%20L%2030.699%2025.763%20L%2030.561%2025.763%20L%2030.561%2026.88%20Z%20M%2030.819%2026.813%20L%2030.63%2026.813%20L%2030.63%2026.948%20L%2030.819%2026.948%20Z%20M%2031.832%2027.811%20C%2031.832%2027.26%2031.379%2026.813%2030.819%2026.813%20L%2030.819%2026.948%20C%2031.303%2026.948%2031.695%2027.335%2031.695%2027.811%20Z%20M%2031.832%2028.928%20L%2031.832%2027.811%20L%2031.695%2027.811%20L%2031.695%2028.928%20Z%20M%2026.097%2028.996%20L%2031.764%2028.996%20L%2031.764%2028.86%20L%2026.097%2028.86%20Z%20M%2023.074%2028.996%20L%2026.097%2028.996%20L%2026.097%2028.86%20L%2023.074%2028.86%20Z%20M%2021.185%2028.996%20L%2023.074%2028.996%20L%2023.074%2028.86%20L%2021.185%2028.86%20Z%20M%2021.116%2027.811%20L%2021.116%2028.928%20L%2021.254%2028.928%20L%2021.254%2027.811%20Z%20M%2022.13%2026.813%20C%2021.57%2026.813%2021.116%2027.26%2021.116%2027.811%20L%2021.254%2027.811%20C%2021.254%2027.335%2021.646%2026.948%2022.13%2026.948%20Z%20M%2022.319%2026.813%20L%2022.13%2026.813%20L%2022.13%2026.948%20L%2022.319%2026.948%20Z%20M%2022.25%2025.763%20L%2022.25%2026.88%20L%2022.388%2026.88%20L%2022.388%2025.763%20Z%20M%2023.051%2024.787%20C%2022.593%2024.883%2022.25%2025.284%2022.25%2025.763%20L%2022.388%2025.763%20C%2022.388%2025.349%2022.684%2025.003%2023.08%2024.919%20Z%20M%2022.976%2015.71%20L%2022.996%2024.853%20L%2023.134%2024.853%20L%2023.114%2015.71%20Z%20M%2015.802%209.262%20C%2019.559%209.262%2022.645%2012.098%2022.976%2015.716%20L%2023.113%2015.704%20C%2022.776%2012.016%2019.632%209.126%2015.802%209.126%20Z%20M%208.628%2015.716%20C%208.959%2012.098%2012.044%209.262%2015.802%209.262%20L%2015.802%209.126%20C%2011.972%209.126%208.828%2012.016%208.49%2015.704%20Z%20M%208.608%2024.845%20L%208.628%2015.71%20L%208.49%2015.71%20L%208.47%2024.845%20Z%20M%209.732%2025.763%20C%209.732%2025.502%209.557%2025.273%209.331%2025.105%20C%209.104%2024.935%208.812%2024.817%208.549%2024.778%20L%208.528%2024.912%20C%208.769%2024.948%209.039%2025.057%209.248%2025.213%20C%209.459%2025.37%209.594%2025.563%209.594%2025.763%20Z%20M%209.732%2026.88%20L%209.732%2025.763%20L%209.594%2025.763%20L%209.594%2026.88%20Z%20M%209.852%2026.813%20L%209.663%2026.813%20L%209.663%2026.948%20L%209.852%2026.948%20Z%20M%2010.865%2027.811%20C%2010.865%2027.26%2010.411%2026.813%209.852%2026.813%20L%209.852%2026.948%20C%2010.335%2026.948%2010.727%2027.335%2010.727%2027.811%20Z%20M%2010.865%2028.928%20L%2010.865%2027.811%20L%2010.727%2027.811%20L%2010.727%2028.928%20Z%20M%208.529%2028.996%20L%2010.796%2028.996%20L%2010.796%2028.86%20L%208.529%2028.86%20Z%20M%208.372%2028.996%20L%208.529%2028.996%20L%208.529%2028.86%20L%208.372%2028.86%20Z%20M%205.507%2028.996%20L%208.372%2028.996%20L%208.372%2028.86%20L%205.507%2028.86%20Z%20M%200.218%2028.996%20L%205.507%2028.996%20L%205.507%2028.86%20L%200.218%2028.86%20Z%20M%200.149%2027.811%20L%200.149%2028.928%20L%200.287%2028.928%20L%200.287%2027.811%20Z%20M%201.162%2026.813%20C%200.603%2026.813%200.149%2027.26%200.149%2027.811%20L%200.287%2027.811%20C%200.287%2027.335%200.679%2026.948%201.162%2026.948%20Z%20M%201.351%2026.813%20L%201.162%2026.813%20L%201.162%2026.948%20L%201.351%2026.948%20Z%20M%201.282%2025.763%20L%201.282%2026.88%20L%201.42%2026.88%20L%201.42%2025.763%20Z%20M%202.296%2024.765%20C%201.736%2024.765%201.282%2025.212%201.282%2025.763%20L%201.42%2025.763%20C%201.42%2025.287%201.812%2024.9%202.296%2024.9%20Z%20M%202.227%208.263%20L%202.227%2024.833%20L%202.365%2024.833%20L%202.365%208.263%20Z%20M%201.257%208.331%20L%202.296%208.331%20L%202.296%208.195%20L%201.257%208.195%20Z%20M%20-0.037%204.187%20L%201.191%208.282%20L%201.323%208.244%20L%200.095%204.148%20Z%20M%205.507%204.099%20L%200.029%204.099%20L%200.029%204.235%20L%205.507%204.235%20L%205.507%204.099%20Z%20M%205.438%200.072%20L%205.438%204.167%20L%205.576%204.167%20L%205.576%200.072%20Z%22%20fill%3D%22rgb(255%2C255%2C255)%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
            tagUrl: "https://warpcast.com/vitalik.eth",
            textColor: "#FFFFFF",
            tooltipDescription: "This address is linked to a Farcaster account",
            warpcastHandle: "vitalik.eth",
          },
          name: "Farcaster",
          ordinal: 5,
          slug: "warpcast-account",
          tagType: "classifier",
        },
        {
          meta: {},
          name: "Vitalik Buterin",
          ordinal: 10,
          slug: "vitalik-buterin",
          tagType: "name",
        },
        {
          meta: {},
          name: "Gitcoin Grantee",
          ordinal: 0,
          slug: "gitcoin-grantee",
          tagType: "generic",
        },
      ],
    },
    name: null,
    private_tags: [],
    proxy_type: null,
    public_tags: [],
    watchlist_names: [],
  },
  gas_used: "21000",
  status: "ok",
  to: {
    ens_domain_name: "crystalhearts.eth",
    hash: "0x52a785cF0238D02e0F4157735f0a17D04AB2bF6c",
    implementations: [],
    is_contract: false,
    is_scam: false,
    is_verified: false,
    metadata: null,
    name: null,
    private_tags: [],
    proxy_type: null,
    public_tags: [],
    watchlist_names: [],
  },
  authorization_list: [],
  method: null,
  fee: {
    type: "actual",
    value: "227143321797000",
  },
  tx_tag: null,
  actions: [],
  gas_limit: "21000",
  gas_price: "10816348657",
  decoded_input: null,
  has_error_in_internal_txs: false,
  token_transfers: [],
  base_fee_per_gas: "9846348657",
  timestamp: "2024-10-28T23:30:59.000000Z",
  nonce: 1420,
  block: 21067426,
  transaction_types: ["coin_transfer"],
  exchange_rate: "3316.49",
  block_number: 21067426,
  has_error_in_internal_transactions: false,
};

export const TXN_LIST = [TXN_VITALIK_DEPOSIT, TXN_VITALIK_TRANSFER];

export function generateFixtures(count: number) {
  const fixtures = [];

  for (let i = 0; i < count; i++) {
    const isDeposit = faker.datatype.boolean();

    const fixture = {
      priority_fee: faker.finance.amount(0, 1000000000000000, 0),
      tx_burnt_fee: faker.finance.amount(0, 1000000000000000, 0),
      raw_input: faker.datatype.hexadecimal({ length: 1000 }),
      result: faker.helpers.arrayElement(["success", "failure"]),
      hash: faker.datatype.hexadecimal({ length: 64 }),
      max_fee_per_gas: faker.finance.amount(1000000000, 100000000000, 0),
      revert_reason: faker.datatype.boolean() ? null : faker.lorem.sentence(),
      confirmation_duration: [
        0,
        faker.datatype.number({ min: 1000, max: 20000 }),
      ],
      type: faker.datatype.number({ min: 0, max: 2 }),
      token_transfers_overflow: faker.datatype.boolean(),
      token_transfers: faker.helpers.arrayElements(
        [
          {
            block_hash:
              "0x6979e04f00a50fe16257215627086f374029eff221a37cff627a6068a7aced51",
            block_number: 21221256,
            from: {
              ens_domain_name: null,
              hash: "0x0000000000000000000000000000000000000000",
              implementations: [],
              is_contract: false,
              is_scam: false,
              is_verified: false,
              metadata: {
                tags: [
                  {
                    meta: {},
                    name: "Metamask User",
                    ordinal: 0,
                    slug: "metamask-user",
                    tagType: "generic",
                  },
                  {
                    meta: {
                      alertStatus: "info",
                      data: "This address is not owned by any user, is often associated with token burn & mint/genesis events and used as a generic null address",
                    },
                    name: "note_0",
                    ordinal: 0,
                    slug: "note0",
                    tagType: "note",
                  },
                  {
                    meta: {},
                    name: "Burn",
                    ordinal: 0,
                    slug: "burn",
                    tagType: "generic",
                  },
                  {
                    meta: {},
                    name: "Null: 0x000...000",
                    ordinal: 10,
                    slug: "null-0x000000",
                    tagType: "name",
                  },
                  {
                    meta: {},
                    name: "Imtoken User",
                    ordinal: 0,
                    slug: "imtoken-user",
                    tagType: "generic",
                  },
                  {
                    meta: {},
                    name: "Miner",
                    ordinal: 0,
                    slug: "miner",
                    tagType: "generic",
                  },
                  {
                    meta: {},
                    name: "Null Address",
                    ordinal: 10,
                    slug: "null-address",
                    tagType: "name",
                  },
                  {
                    meta: {},
                    name: "Null",
                    ordinal: 0,
                    slug: "null",
                    tagType: "protocol",
                  },
                  {
                    meta: {},
                    name: "BLOCKED",
                    ordinal: 0,
                    slug: "blocked",
                    tagType: "generic",
                  },
                  {
                    meta: {},
                    name: "Genesis",
                    ordinal: 0,
                    slug: "genesis",
                    tagType: "generic",
                  },
                ],
              },
              name: null,
              private_tags: [],
              proxy_type: "unknown",
              public_tags: [],
              watchlist_names: [],
            },
            log_index: 422,
            method: null,
            timestamp: null,
            to: {
              ens_domain_name: null,
              hash: "0x5c7BCd6E7De5423a257D81B442095A1a6ced35C5",
              implementations: [
                {
                  address: "0x48Dcf75EA18233BA947E4480dCd70594720449C1",
                  name: "Ethereum_SpokePool",
                },
              ],
              is_contract: true,
              is_scam: false,
              is_verified: true,
              metadata: {
                tags: [
                  {
                    meta: {},
                    name: "Across Protocol: Ethereum Spoke Pool V2",
                    ordinal: 10,
                    slug: "across-protocol-ethereum-spoke-pool-v2",
                    tagType: "name",
                  },
                  {
                    meta: {
                      bgColor: "#2F3237",
                      tagIcon:
                        "https://blockscout-content.s3.amazonaws.com/across-protocol.svg",
                      tagUrl: "https://across.to/bridge?utm_source=Blockscout",
                      textColor: "#6DF8D7",
                      tooltipDescription:
                        "Bridging method that combines an optimistic oracle, bonded relayers and single-sided liquidity pools to provide decentralized instant transactions from rollup chains to Ethereum mainnet.",
                      tooltipTitle: "Across Protocol",
                      tooltipUrl: "https://across.to/bridge",
                    },
                    name: "Across Protocol",
                    ordinal: 0,
                    slug: "across-protocol",
                    tagType: "protocol",
                  },
                  {
                    meta: {
                      bgColor: "#6DF8D7",
                      textColor: "#2F3237",
                    },
                    name: "Across Protocol: Spoke Pool",
                    ordinal: 10,
                    slug: "across-protocol-spoke-pool",
                    tagType: "name",
                  },
                ],
              },
              name: "ERC1967Proxy",
              private_tags: [],
              proxy_type: "eip1967",
              public_tags: [],
              watchlist_names: [],
            },
            token: {
              address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
              circulating_market_cap: "9676244462.070765",
              decimals: "18",
              exchange_rate: "3368.6",
              holders: "1151470",
              icon_url:
                "https://assets.coingecko.com/coins/images/2518/small/weth.png?1696503332",
              name: "Wrapped Ether",
              symbol: "WETH",
              total_supply: "2879560377381669569860630",
              type: "ERC-20",
              volume_24h: "1348742956.3707833",
            },
            total: {
              decimals: "18",
              value: "32010000000000000000",
            },
            transaction_hash:
              "0x31634ddc4975cc9f2c3c6426034fe0ed30163000cd067e80857136ab86dc0a3b",
            tx_hash:
              "0x31634ddc4975cc9f2c3c6426034fe0ed30163000cd067e80857136ab86dc0a3b",
            type: "token_minting",
          },
        ],
        { min: 0, max: 1 },
      ),
      confirmations: faker.datatype.number({ min: 1, max: 1000000 }),
      position: faker.datatype.number({ min: 0, max: 1000 }),
      max_priority_fee_per_gas: faker.finance.amount(100000000, 10000000000, 0),
      transaction_tag: faker.datatype.boolean() ? null : faker.word.noun(),
      created_contract: faker.datatype.boolean()
        ? null
        : faker.finance.ethereumAddress(),
      value: faker.finance.amount(0, 1000000000000000000000, 0),
      tx_types: faker.helpers.arrayElements(
        ["coin_transfer", "contract_call", "token_transfer"],
        { min: 1, max: 3 },
      ),
      from: {
        ens_domain_name: faker.datatype.boolean()
          ? faker.internet.domainName()
          : undefined,
        hash: faker.finance.ethereumAddress(),
        is_contract: faker.datatype.boolean(),
        is_verified: faker.datatype.boolean(),
      },
      gas_used: faker.finance.amount(21000, 1000000, 0),
      status: faker.helpers.arrayElement(["ok", "error"]),
      to: {
        ens_domain_name: faker.datatype.boolean()
          ? faker.internet.domainName()
          : undefined,
        hash: faker.finance.ethereumAddress(),
        is_contract: faker.datatype.boolean(),
        is_verified: faker.datatype.boolean(),
      },
      fee: {
        type: "actual",
        value: faker.finance.amount(0, 1000000000000000, 0),
      },
      gas_limit: faker.finance.amount(21000, 10000000, 0),
      gas_price: faker.finance.amount(1000000000, 100000000000, 0),
      base_fee_per_gas: faker.finance.amount(1000000000, 100000000000, 0),
      timestamp: faker.date.recent().toISOString(),
      nonce: faker.datatype.number({ min: 0, max: 10000 }),
      block: faker.datatype.number({ min: 10000000, max: 30000000 }),
      exchange_rate: faker.finance.amount(1000, 5000, 2),
      block_number: faker.datatype.number({ min: 10000000, max: 30000000 }),
    };

    if (isDeposit) {
      // @ts-ignore
      fixture.method = "deposit";

      // @ts-ignore
      fixture.decoded_input = {
        method_call:
          "deposit(address,address,address,uint256,uint256,int64,uint32,bytes,uint256)",
        method_id: faker.datatype.hexadecimal({ length: 8 }),
        parameters: [
          {
            name: "spokePool",
            type: "address",
            value: faker.finance.ethereumAddress(),
          },
          {
            name: "recipient",
            type: "address",
            value: faker.finance.ethereumAddress(),
          },
          {
            name: "originToken",
            type: "address",
            value: faker.finance.ethereumAddress(),
          },
          {
            name: "amount",
            type: "uint256",
            value: faker.finance.amount(0, 1000000000000000000000, 0),
          },
          {
            name: "destinationChainId",
            type: "uint256",
            value: faker.datatype.number({ min: 1, max: 100000 }),
          },
          {
            name: "relayerFeePct",
            type: "int64",
            value: faker.finance.amount(0, 1000000000000000, 0),
          },
          {
            name: "quoteTimestamp",
            type: "uint32",
            value: faker.datatype.number({ min: 1000000000, max: 2000000000 }),
          },
          { name: "message", type: "bytes", value: "0x" },
          {
            name: "maxCount",
            type: "uint256",
            value: faker.finance.amount(
              0,
              115792089237316195423570985008687907853269984665640564039457584007913129639935,
              0,
            ),
          },
        ],
      };
    } else {
      // @ts-ignore
      fixture.method = null;

      // @ts-ignore
      fixture.decoded_input = null;
    }

    fixtures.push(fixture);
  }

  console.log({ fixtures });

  return fixtures;
}
