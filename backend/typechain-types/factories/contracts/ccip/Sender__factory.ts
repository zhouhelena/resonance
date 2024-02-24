/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { Sender, SenderInterface } from "../../../contracts/ccip/Sender";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
      {
        internalType: "address",
        name: "_link",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdc",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "calculatedFees",
        type: "uint256",
      },
    ],
    name: "NotEnoughBalance",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "feeToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fees",
        type: "uint256",
      },
    ],
    name: "TokensSent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sendTokens",
    outputs: [
      {
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610c69380380610c698339818101604052810190610032919061015f565b826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050506101b2565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061012c82610101565b9050919050565b61013c81610121565b811461014757600080fd5b50565b60008151905061015981610133565b92915050565b600080600060608486031215610178576101776100fc565b5b60006101868682870161014a565b93505060206101978682870161014a565b92505060406101a88682870161014a565b9150509250925092565b610aa8806101c16000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063a7149c1714610030575b600080fd5b61004a6004803603810190610045919061056d565b610060565b60405161005791906105d9565b60405180910390f35b6000806040518060a001604052808560405160200161007f9190610603565b6040516020818303038152906040528152602001846040516020016100a4919061062d565b6040516020818303038152906040528152602001600067ffffffffffffffff8111156100d3576100d2610648565b5b60405190808252806020026020018201604052801561010c57816020015b6100f9610464565b8152602001906001900390816100f15790505b508152602001600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200161016a6040518060200160405280620f42408152506103e5565b815250905060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166320487ded87846040518363ffffffff1660e01b81526004016101cd92919061089d565b602060405180830381865afa1580156101ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061020e91906108e2565b9050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b360008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b815260040161028d92919061090f565b6020604051808303816000875af11580156102ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d09190610970565b5060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166396f4e9f987846040518363ffffffff1660e01b815260040161032c92919061089d565b6020604051808303816000875af115801561034b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036f91906109c9565b92508567ffffffffffffffff16837f7807786d0121e376a7af8fc5a40b203d59ab27f13f5ff48e88ba2d30b520bc278787600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866040516103d494939291906109f6565b60405180910390a350509392505050565b60606397a657c960e01b826040516024016104009190610a57565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050509050919050565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b600080fd5b600067ffffffffffffffff82169050919050565b6104b681610499565b81146104c157600080fd5b50565b6000813590506104d3816104ad565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610504826104d9565b9050919050565b610514816104f9565b811461051f57600080fd5b50565b6000813590506105318161050b565b92915050565b6000819050919050565b61054a81610537565b811461055557600080fd5b50565b60008135905061056781610541565b92915050565b60008060006060848603121561058657610585610494565b5b6000610594868287016104c4565b93505060206105a586828701610522565b92505060406105b686828701610558565b9150509250925092565b6000819050919050565b6105d3816105c0565b82525050565b60006020820190506105ee60008301846105ca565b92915050565b6105fd816104f9565b82525050565b600060208201905061061860008301846105f4565b92915050565b61062781610537565b82525050565b6000602082019050610642600083018461061e565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61068081610499565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156106c05780820151818401526020810190506106a5565b60008484015250505050565b6000601f19601f8301169050919050565b60006106e882610686565b6106f28185610691565b93506107028185602086016106a2565b61070b816106cc565b840191505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61074b816104f9565b82525050565b61075a81610537565b82525050565b6040820160008201516107766000850182610742565b5060208201516107896020850182610751565b50505050565b600061079b8383610760565b60408301905092915050565b6000602082019050919050565b60006107bf82610716565b6107c98185610721565b93506107d483610732565b8060005b838110156108055781516107ec888261078f565b97506107f7836107a7565b9250506001810190506107d8565b5085935050505092915050565b600060a083016000830151848203600086015261082f82826106dd565b9150506020830151848203602086015261084982826106dd565b9150506040830151848203604086015261086382826107b4565b91505060608301516108786060860182610742565b506080830151848203608086015261089082826106dd565b9150508091505092915050565b60006040820190506108b26000830185610677565b81810360208301526108c48184610812565b90509392505050565b6000815190506108dc81610541565b92915050565b6000602082840312156108f8576108f7610494565b5b6000610906848285016108cd565b91505092915050565b600060408201905061092460008301856105f4565b610931602083018461061e565b9392505050565b60008115159050919050565b61094d81610938565b811461095857600080fd5b50565b60008151905061096a81610944565b92915050565b60006020828403121561098657610985610494565b5b60006109948482850161095b565b91505092915050565b6109a6816105c0565b81146109b157600080fd5b50565b6000815190506109c38161099d565b92915050565b6000602082840312156109df576109de610494565b5b60006109ed848285016109b4565b91505092915050565b6000608082019050610a0b60008301876105f4565b610a18602083018661061e565b610a2560408301856105f4565b610a32606083018461061e565b95945050505050565b602082016000820151610a516000850182610751565b50505050565b6000602082019050610a6c6000830184610a3b565b9291505056fea2646970667358221220d4833bd82e07ae1e47ad64529ec676906a902c35de21656acfe30b7bbc3af91064736f6c63430008140033";

type SenderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SenderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Sender__factory extends ContractFactory {
  constructor(...args: SenderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _router: AddressLike,
    _link: AddressLike,
    _usdc: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_router, _link, _usdc, overrides || {});
  }
  override deploy(
    _router: AddressLike,
    _link: AddressLike,
    _usdc: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_router, _link, _usdc, overrides || {}) as Promise<
      Sender & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Sender__factory {
    return super.connect(runner) as Sender__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SenderInterface {
    return new Interface(_abi) as SenderInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Sender {
    return new Contract(address, _abi, runner) as unknown as Sender;
  }
}
