export const abi =[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_vault",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_sender_arbitrum",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_sender_polygon",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_sender_aptos",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_receiver_arbitrum",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_receiver_polygon",
          "type": "address"
        },
        {
          "internalType": "uint64",
          "name": "_arbitrum_selector",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "_polygon_selector",
          "type": "uint64"
        },
        {
          "internalType": "address",
          "name": "_usdc",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_ethAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_arbitrumAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_polygonAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_aptosAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_auroraAmount",
          "type": "uint256"
        }
      ],
      "name": "deployCapital",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]