## EAS
- To validate features and provide parity with the original sdk
    - `/sdk` are necessary import. unexpected to be used in components
    - Test cases are extended form original repository and tested against with sdk vs viem version, with best effort in aligning the dependencies versions although not always possible
      - vitest is used over chai / contexts
- differences
  - use newer version of multiformats
  - use fflate over pako
  - schema encoder methods are made public to ease testing