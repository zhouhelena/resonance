# Resonance
By Helena Zhou, Vincent Tiu

[Tweet](https://x.com/vincetiu8/status/1761398058460606785?s=20)

Brief Description:
Resonance is a one-click multi-chain liquidity provider that helps you find the DeFi strategy that resonates with you. Users can simply hit "Invest" on the frontend, and our smart-contracts do all the heavy lifting to distribute your assets across different liquidity pools on key blockchains (including Aptos, Near, Arbitrum, Polygon and more!) Users can customize the distribution of their assets and view real-time statistics provided by the Graph, making Resonance the one-stop shop for the aspiring crypto trader!

Country / Region: USA (UPenn)



Technical Solution:
- Frontend: React, Graph, Wagmi, Chakara UI, Next.js
- Aptos - Move, Aptos CLI, Axelar Intents, LiquidSwap fork
- Near - Solidity, Hardhat, Aurora Bridge, Range, Uniswap fork
- ETH L2s - Solidity, Hardhat, Chainlink CCIP, Range, Uniswap fork

Our transaction process starts with the user hitting "Invest" on the frontend. This calls our router smart contract, which distributes the input funds according to the user's specified ratios.
- For native Ethereum, the funds are used to mint shares in a Range Vault (forked for this hackathon), which creates a liquidity position in a Uniswap Pool (forked).
- For ETH L2s, we send the funds to a sender contract, which forwards the message to the relevant receiver using Chainlink CCIP. Once the receiver gets the funds, they are used to mint shares in a Range Vault deployed on the L2, which creates a liquidity position in Uniswap. 
- For Near, we use Aurora bridge to send the funds in a similar manner, and the remaining process is similar to the ETH L2s.
- For Aptos, we use Axelar Intents to bridge the funds to Aptos, then create a liquidity position in a LiquidSwap pool (forked).


dApp Theme: DeFi

What sponsor bounty you're applying to? (Note: Can me multiple)

- Chainlink Bounty 1: Best usage of Chainlink CCIP
- Range Bounty 1: Cross chain connected LPing Strategy using Axelar Intents
- The Graph Bounty 2: Best Use of Existing Subgraph
- Near Bounty 1: Cross-Chain Convergence and Interoperability
- Aptos Bounty 1: Best Project Built on Aptos

Links:
- [Pitch Deck](https://docs.google.com/presentation/d/1Sk4haxpzzAb7QPfhkXHvDHWOtAOtuFQv/edit?usp=sharing&ouid=100750330982446274277&rtpof=true&sd=true)
- [Live Demo](https://youtu.be/rN72n7ad8qo)

Deployed Smart Contract Addresses:
```
USDC_SEPOLIA_ADDRESS=0x2BfbA4a7c501F2a8CF9161f99B2393E8B42c99d4
WETH_SEPOLIA_ADDRESS=0x863129EC84037dE407F24B48e316528F42354f8F
UNISWAP_POOL_SEPOLIA_ADDRESS=0x30b5aa9360f6EF401794d228225b96a4466dF2cf
RANGE_VAULT_SEPOLIA_ADDRESS=0x03B2C8DB7dE4663152dBD384318eB37dF3E94C91
CCIP_ROUTER_SEPOLIA_ADDRESS=0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59
CCIP_LINK_SEPOLIA_ADDRESS=0x779877A7B0D9E8603169DdbD7836e478b4624789
SEPOLIA_DESTINATION_ADDRESS=16015286601757825753
SENDER_SEPOLIA_ADDRESS=0xf1520c9135EA57DCD4447b54c0B0ada0B62Ce0Bf

USDC_ARBITRUM_ADDRESS=0x2AC9E90de2039921A319a6C09B94c922Ded3B48A
WETH_ARBITRUM_ADDRESS=0xB090d4a13EA212671D5A53dC47994339f7b04a72
UNISWAP_POOL_ARBITRUM_ADDRESS=0xB85BC1f478ebc36FeBD510B68c164276779A9037
RANGE_VAULT_ARBITRUM_ADDRESS=0x4864f17f2a451A7321DC71928809BfA9A7E5ED69
CCIP_ROUTER_ARBITRUM_ADDRESS=0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165
CCIP_LINK_ARBITRUM_ADDRESS=0xb1D4538B4571d411F07960EF2838Ce337FE1E80E
ARBITRUM_DESTINATION_ADDRESS=3478487238524512106
RECEIVER_ARBITRUM_ADDRESS=0x53514467BD3201d48fD29d28852bFaC3032f2C0E

USDC_MUMBAI_ADDRESS=0x669D57E132E22b07a3DaC831657fDB91912722F2
WETH_MUMBAI_ADDRESS=0x8bcbeBF0d56d6AE40987d143486Ed8E9e61b0154
UNISWAP_POOL_MUMBAI_ADDRESS=0x125B8eB362a8185D0A8efA0d937D12B9B7273D7A
RANGE_VAULT_MUMBAI_ADDRESS=0xeef72a4A61fC1BEc58181b972D9c5cE5B707f869
CCIP_ROUTER_MUMBAI_ADDRESS=0x1035CabC275068e0F4b745A29CEDf38E13aF41b1
CCIP_LINK_MUMBAI_ADDRESS=0x326C977E6efc84E512bB9C30f76E30c160eD06FB
MUMBAI_DESTINATION_ADDRESS=12532609583862916517
RECEIVER_MUMBAI_ADDRESS=0x450278fBf7825fC5c9AFA1E0c907E541734c2aFa

USDC_AURORA_ADDRESS=0x2AC9E90de2039921A319a6C09B94c922Ded3B48A
WETH_AURORA_ADDRESS=0x444CC311AF46558f057Dc6794c3EB3abF7A15e97
UNISWAP_POOL_AURORA_ADDRESS=0x666E810Bf1C94Affc64F33fa1d1AA0F02Bdb7D64
RANGE_VAULT_AURORA_ADDRESS=0x46eED4B5ca53F5168c28872B36C35A8b3c8423cf

APTOS_TOKENS_ADDRESS=0xd3eb2c2e03749a29b1e3a62773e4f1de8a8563f01765bb813ca70b278dce83a0
APTOS_AMM_ADDRESS=0xe9d8eecaf7511cbd8c2759ae92504c0207c367be0bd1f9dd13b6a2afd45d0ef0
```

Deployed to Ethereum, Aptos, Near (Aurora), Arbitrum and Polygon


Not part of a larger/past project.
