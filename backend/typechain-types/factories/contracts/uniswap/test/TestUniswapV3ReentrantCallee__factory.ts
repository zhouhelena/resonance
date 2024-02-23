/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  TestUniswapV3ReentrantCallee,
  TestUniswapV3ReentrantCalleeInterface,
} from "../../../../contracts/uniswap/test/TestUniswapV3ReentrantCallee";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "swapToReenter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "uniswapV3SwapCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061102b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063c22a2bfe1461003b578063fa461e3314610070575b600080fd5b61006e6004803603602081101561005157600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166100ec565b005b61006e6004803603606081101561008657600080fd5b8135916020810135918101906060810160408201356401000000008111156100ad57600080fd5b8201836020820111156100bf57600080fd5b803590602001918460018302840111640100000000831117156100e157600080fd5b509092509050610212565b6040805160008082526020820192839052630251596160e31b8352602482018181526044830182905260016064840181905273fffd8963efd1fc6a506488495d951d5263988d256084850181905260a060a48601908152855160c4870181905273ffffffffffffffffffffffffffffffffffffffff89169763128acb0897879690939092909160e48501918083838b5b8381101561019457818101518382015260200161017c565b50505050905090810190601f1680156101c15780820380516001836020036101000a031916815260200191505b5096505050505050506040805180830381600087803b1580156101e357600080fd5b505af11580156101f7573d6000803e3d6000fd5b505050506040513d604081101561020d57600080fd5b505050565b6040805160008082526020820192839052630251596160e31b835260248201818152604483018290526001606484018190526084840183905260a060a48501908152845160c48601819052339663128acb0896869586949193909260e4850191808383895b8381101561028f578181015183820152602001610277565b50505050905090810190601f1680156102bc5780820380516001836020036101000a031916815260200191505b5096505050505050506040805180830381600087803b1580156102de57600080fd5b505af192505050801561030a57506040513d60408110156102fe57600080fd5b50805160209091015160015b61046d57610316610f4f565b80610321575061045e565b604051806040016040528060038152602001624c4f4b60e81b8152506040516020018080602001828103825283818151815260200191508051906020019080838360005b8381101561037d578181015183820152602001610365565b50505050905090810190601f1680156103aa5780820380516001836020036101000a031916815260200191505b509250505060405160208183030381529060405280519060200120816040516020018080602001828103825283818151815260200191508051906020019080838360005b838110156104065781810151838201526020016103ee565b50505050905090810190601f1680156104335780820380516001836020036101000a031916815260200191505b5092505050604051602081830303815290604052805190602001201461045857600080fd5b50610468565b3d6000803e3d6000fd5b610470565b50505b60408051600080825260208201928390527f3c8a7d8d0000000000000000000000000000000000000000000000000000000083526024820181815260448301829052606483018290526084830182905260a060a48401908152835160c485018190523395633c8a7d8d9585948594859492939192909160e4850191808383895b838110156105085781810151838201526020016104f0565b50505050905090810190601f1680156105355780820380516001836020036101000a031916815260200191505b5096505050505050506040805180830381600087803b15801561055757600080fd5b505af192505050801561058357506040513d604081101561057757600080fd5b50805160209091015160015b6106d75761058f610f4f565b8061059a575061045e565b604051806040016040528060038152602001624c4f4b60e81b8152506040516020018080602001828103825283818151815260200191508051906020019080838360005b838110156105f65781810151838201526020016105de565b50505050905090810190601f1680156106235780820380516001836020036101000a031916815260200191505b509250505060405160208183030381529060405280519060200120816040516020018080602001828103825283818151815260200191508051906020019080838360005b8381101561067f578181015183820152602001610667565b50505050905090810190601f1680156106ac5780820380516001836020036101000a031916815260200191505b509250505060405160208183030381529060405280519060200120146106d157600080fd5b506106da565b50505b604080517f4f1eb3d80000000000000000000000000000000000000000000000000000000081526000600482018190526024820181905260448201819052606482018190526084820181905282513393634f1eb3d89360a480820194929392918390030190829087803b15801561075057600080fd5b505af192505050801561077c57506040513d604081101561077057600080fd5b50805160209091015160015b6108d057610788610f4f565b80610793575061045e565b604051806040016040528060038152602001624c4f4b60e81b8152506040516020018080602001828103825283818151815260200191508051906020019080838360005b838110156107ef5781810151838201526020016107d7565b50505050905090810190601f16801561081c5780820380516001836020036101000a031916815260200191505b509250505060405160208183030381529060405280519060200120816040516020018080602001828103825283818151815260200191508051906020019080838360005b83811015610878578181015183820152602001610860565b50505050905090810190601f1680156108a55780820380516001836020036101000a031916815260200191505b509250505060405160208183030381529060405280519060200120146108ca57600080fd5b506108d3565b50505b3373ffffffffffffffffffffffffffffffffffffffff1663a34123a760008060006040518463ffffffff1660e01b81526004018084815260200183815260200182815260200193505050506040805180830381600087803b15801561093757600080fd5b505af192505050801561096357506040513d604081101561095757600080fd5b50805160209091015160015b610ab75761096f610f4f565b8061097a575061045e565b604051806040016040528060038152602001624c4f4b60e81b8152506040516020018080602001828103825283818151815260200191508051906020019080838360005b838110156109d65781810151838201526020016109be565b50505050905090810190601f168015610a035780820380516001836020036101000a031916815260200191505b509250505060405160208183030381529060405280519060200120816040516020018080602001828103825283818151815260200191508051906020019080838360005b83811015610a5f578181015183820152602001610a47565b50505050905090810190601f168015610a8c5780820380516001836020036101000a031916815260200191505b50925050506040516020818303038152906040528051906020012014610ab157600080fd5b50610aba565b50505b60408051600080825260208201928390527f490e6cbc000000000000000000000000000000000000000000000000000000008352602482018181526044830182905260648301829052608060848401908152835160a48501819052339563490e6cbc95859485949193909260c4850191808383895b83811015610b47578181015183820152602001610b2f565b50505050905090810190601f168015610b745780820380516001836020036101000a031916815260200191505b5095505050505050600060405180830381600087803b158015610b9657600080fd5b505af1925050508015610ba7575060015b610cf757610bb3610f4f565b80610bbe575061045e565b604051806040016040528060038152602001624c4f4b60e81b8152506040516020018080602001828103825283818151815260200191508051906020019080838360005b83811015610c1a578181015183820152602001610c02565b50505050905090810190601f168015610c475780820380516001836020036101000a031916815260200191505b509250505060405160208183030381529060405280519060200120816040516020018080602001828103825283818151815260200191508051906020019080838360005b83811015610ca3578181015183820152602001610c8b565b50505050905090810190601f168015610cd05780820380516001836020036101000a031916815260200191505b50925050506040516020818303038152906040528051906020012014610cf557600080fd5b505b604080517f85b667290000000000000000000000000000000000000000000000000000000081526000600482018190526024820181905260448201819052825133936385b6672993606480820194929392918390030190829087803b158015610d5f57600080fd5b505af1925050508015610d8b57506040513d6040811015610d7f57600080fd5b50805160209091015160015b610edf57610d97610f4f565b80610da2575061045e565b604051806040016040528060038152602001624c4f4b60e81b8152506040516020018080602001828103825283818151815260200191508051906020019080838360005b83811015610dfe578181015183820152602001610de6565b50505050905090810190601f168015610e2b5780820380516001836020036101000a031916815260200191505b509250505060405160208183030381529060405280519060200120816040516020018080602001828103825283818151815260200191508051906020019080838360005b83811015610e87578181015183820152602001610e6f565b50505050905090810190601f168015610eb45780820380516001836020036101000a031916815260200191505b50925050506040516020818303038152906040528051906020012014610ed957600080fd5b50610ee2565b50505b604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f556e61626c6520746f207265656e746572000000000000000000000000000000604482015290519081900360640190fd5b60e01c90565b600060443d1015610f5f57610ff2565b600481823e6308c379a0610f738251610f49565b14610f7d57610ff2565b6040513d600319016004823e80513d67ffffffffffffffff8160248401118184111715610fad5750505050610ff2565b82840192508251915080821115610fc75750505050610ff2565b503d83016020828401011115610fdf57505050610ff2565b601f01601f191681016020016040529150505b9056fea2646970667358221220e5ba8a576aa38a9e4367195ad26d5487210a777a8b1834beef211fe617d7b71f64736f6c63430007060033";

type TestUniswapV3ReentrantCalleeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestUniswapV3ReentrantCalleeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestUniswapV3ReentrantCallee__factory extends ContractFactory {
  constructor(...args: TestUniswapV3ReentrantCalleeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      TestUniswapV3ReentrantCallee & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): TestUniswapV3ReentrantCallee__factory {
    return super.connect(runner) as TestUniswapV3ReentrantCallee__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestUniswapV3ReentrantCalleeInterface {
    return new Interface(_abi) as TestUniswapV3ReentrantCalleeInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): TestUniswapV3ReentrantCallee {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as TestUniswapV3ReentrantCallee;
  }
}
