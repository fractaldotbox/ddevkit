## FAQ



## What is different in dApp development?


- "The ecosystem is also continuously evolving, meaning you need to adapt to new improvements or get left behind." Read more on https://wagmi.sh/core/why

## Why not using library X?

- Build on top of viem, which has minimum dependency, and @radix for max compatability with shadcn. 
- We love wagmi and many other web3 libraries depends on it anyway. Thus many, but not all, components depends on @wagmi/core, while we stay framework agnoistic so wagmi is peer dependency for react.
- Regarding data fetching, we try to decouple that with presentation layer, data source
    - wagmi use tanstack query which has adapters to various frameworks.
    - data source can be RPC, the graph or customized.
   

- Opinonated (us) defaults and unopionated extensions  

 - First of all, we support a plugin systems such that libraries sensible to use case like `starknetjs` could be added easily, although we also prefer [scure-starknet](https://github.com/paulmillr/scure-starknet). Libraries such as rainbowkit are intentionally excluded. 
- At its core, we prefer lightweight, framework-agnoistic libraries with minimal context provider such as `nanostore` or `permissionless`. Rational of individual choices are documented at [Dependencies](/design/dependencies)
- At the end of the day these are code receipes and components, nothing stops anyone to extend with particular component libraries.    
    - These components wont be possible without amazing work at [onchainkit](https://github.com/coinbase/onchainkit), ensjs, [starknet-react](https://github.com/apibara/starknet-react) etc. Thus we create default opionated receipes, also shows side by side methods to opt for integrating particular 3rd party libraries.
    - Most libraries generally included opionated data sources, data fetching, validations and state management/caching dependency. 
    - Best way is to make it a community effort as it also not possible for authors to keep track of latest versions.
    - Many components are of similar purposes (e.g. useAddress) but not interoperable, generally it is hard to achieve consistent styles and integrating multiple fast itearting libraries the dependency hell and outdated documentations are often a headache itself. 


- Ethers and viem compatability
  - often installing both as libraries are still depending ether.js

## Which ecosystems are supported
- We focus on Ethereum ecosystems, we prioritize L1 and L2 on OPstack and starknet.
- Current alpha version is tested on sepolia, optimism sepolia and base sepolia


## How is this different from Scaffold-ETH (or Scaffold-X)
- check [starter-kit](/design/starter-kit)

## Which frameworks are supported
- Currently we focus on React with wagmi, but make it framework agnostic and support solid.js is a goal (reaplcing underlying @radix ui components) .
- for web framework, next.js is supported for now. We will try to align what is supported at shadcdn

## How secure is this package?
Use at your own risk as you should always have been and security is often application specific.
We're not infosec experts and precisely for that reason we do best-effort to align best practices and avoid common pitfalls, and make this open so everyone can point out any risks. We would like to work with auditors.

