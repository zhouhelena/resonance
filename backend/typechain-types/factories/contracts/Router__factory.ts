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
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Router, RouterInterface } from "../../contracts/Router";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_vault",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sender_arbitrum",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sender_polygon",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sender_aptos",
        type: "address",
      },
      {
        internalType: "address",
        name: "_receiver_arbitrum",
        type: "address",
      },
      {
        internalType: "address",
        name: "_receiver_polygon",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_arbitrum_selector",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "_polygon_selector",
        type: "uint64",
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
        name: "_ethAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_arbitrumAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_polygonAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_aptosAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_auroraAmount",
        type: "uint256",
      },
    ],
    name: "deployCapital",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000b7738038062000b7783398181016040528101906200003791906200030d565b886000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555087600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555086600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555084600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600660146101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555081600760006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050505050505050620003ec565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002908262000263565b9050919050565b620002a28162000283565b8114620002ae57600080fd5b50565b600081519050620002c28162000297565b92915050565b600067ffffffffffffffff82169050919050565b620002e781620002c8565b8114620002f357600080fd5b50565b6000815190506200030781620002dc565b92915050565b60008060008060008060008060006101208a8c0312156200033357620003326200025e565b5b6000620003438c828d01620002b1565b9950506020620003568c828d01620002b1565b9850506040620003698c828d01620002b1565b97505060606200037c8c828d01620002b1565b96505060806200038f8c828d01620002b1565b95505060a0620003a28c828d01620002b1565b94505060c0620003b58c828d01620002f6565b93505060e0620003c88c828d01620002f6565b925050610100620003dc8c828d01620002b1565b9150509295985092959850929598565b61077b80620003fc6000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80637238af6c14610030575b600080fd5b61004a600480360381019061004591906103c1565b61004c565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b360008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16620f42406040518363ffffffff1660e01b81526004016100cc9291906104c2565b6020604051808303816000875af11580156100eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061010f9190610523565b5060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b341ee9f866040518060400160405280620f42408152602001620f42408152506040518363ffffffff1660e01b815260040161018592919061060a565b60408051808303816000875af11580156101a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101c79190610648565b5050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a7149c17600660149054906101000a900467ffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876040518463ffffffff1660e01b8152600401610260939291906106ab565b6020604051808303816000875af115801561027f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a39190610718565b50600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a7149c17600760009054906101000a900467ffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866040518463ffffffff1660e01b815260040161033b939291906106ab565b6020604051808303816000875af115801561035a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037e9190610718565b505050505050565b600080fd5b6000819050919050565b61039e8161038b565b81146103a957600080fd5b50565b6000813590506103bb81610395565b92915050565b600080600080600060a086880312156103dd576103dc610386565b5b60006103eb888289016103ac565b95505060206103fc888289016103ac565b945050604061040d888289016103ac565b935050606061041e888289016103ac565b925050608061042f888289016103ac565b9150509295509295909350565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006104678261043c565b9050919050565b6104778161045c565b82525050565b6000819050919050565b6000819050919050565b60006104ac6104a76104a28461047d565b610487565b61038b565b9050919050565b6104bc81610491565b82525050565b60006040820190506104d7600083018561046e565b6104e460208301846104b3565b9392505050565b60008115159050919050565b610500816104eb565b811461050b57600080fd5b50565b60008151905061051d816104f7565b92915050565b60006020828403121561053957610538610386565b5b60006105478482850161050e565b91505092915050565b6105598161038b565b82525050565b600060029050919050565b600081905092915050565b6000819050919050565b6105888161038b565b82525050565b600061059a838361057f565b60208301905092915050565b6000602082019050919050565b6105bc8161055f565b6105c6818461056a565b92506105d182610575565b8060005b838110156106025781516105e9878261058e565b96506105f4836105a6565b9250506001810190506105d5565b505050505050565b600060608201905061061f6000830185610550565b61062c60208301846105b3565b9392505050565b60008151905061064281610395565b92915050565b6000806040838503121561065f5761065e610386565b5b600061066d85828601610633565b925050602061067e85828601610633565b9150509250929050565b600067ffffffffffffffff82169050919050565b6106a581610688565b82525050565b60006060820190506106c0600083018661069c565b6106cd602083018561046e565b6106da6040830184610550565b949350505050565b6000819050919050565b6106f5816106e2565b811461070057600080fd5b50565b600081519050610712816106ec565b92915050565b60006020828403121561072e5761072d610386565b5b600061073c84828501610703565b9150509291505056fea26469706673582212205122e8122727937c07840cc0f6e90f247aafb7f28b45c953d3ad69688a641ce064736f6c63430008140033";

type RouterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RouterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Router__factory extends ContractFactory {
  constructor(...args: RouterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _vault: AddressLike,
    _sender_arbitrum: AddressLike,
    _sender_polygon: AddressLike,
    _sender_aptos: AddressLike,
    _receiver_arbitrum: AddressLike,
    _receiver_polygon: AddressLike,
    _arbitrum_selector: BigNumberish,
    _polygon_selector: BigNumberish,
    _usdc: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _vault,
      _sender_arbitrum,
      _sender_polygon,
      _sender_aptos,
      _receiver_arbitrum,
      _receiver_polygon,
      _arbitrum_selector,
      _polygon_selector,
      _usdc,
      overrides || {}
    );
  }
  override deploy(
    _vault: AddressLike,
    _sender_arbitrum: AddressLike,
    _sender_polygon: AddressLike,
    _sender_aptos: AddressLike,
    _receiver_arbitrum: AddressLike,
    _receiver_polygon: AddressLike,
    _arbitrum_selector: BigNumberish,
    _polygon_selector: BigNumberish,
    _usdc: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _vault,
      _sender_arbitrum,
      _sender_polygon,
      _sender_aptos,
      _receiver_arbitrum,
      _receiver_polygon,
      _arbitrum_selector,
      _polygon_selector,
      _usdc,
      overrides || {}
    ) as Promise<
      Router & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Router__factory {
    return super.connect(runner) as Router__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RouterInterface {
    return new Interface(_abi) as RouterInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Router {
    return new Contract(address, _abi, runner) as unknown as Router;
  }
}