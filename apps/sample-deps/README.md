## Demo
- benchmark the bundle 

 Similar to https://github.com/ethereum-attestation-service/met-irl


- use ANALYZE=true
pnpm --filter sample-deps list --depth 3       
pnpm --filter sample-deps build:analyze

## current limitations
- duplications of ethers /wagmi (different versions of sub-dependencies @noble)

- EAS use ethers/hardhat

- ENS use pako

- dependency of coinbase 3,4 within wagmi for dynamic import


Gzipped node:1.19MB client:813kb

wagmi only client<260kb


## Future study
- analyze [dependency graph on github](https://github.com/wevm/wagmi/network/dependents) and find overlapping usage of wagmi & ethers 