/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface SqrtPriceMathTestInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getAmount0Delta"
      | "getAmount1Delta"
      | "getGasCostOfGetAmount0Delta"
      | "getGasCostOfGetAmount1Delta"
      | "getGasCostOfGetNextSqrtPriceFromInput"
      | "getGasCostOfGetNextSqrtPriceFromOutput"
      | "getNextSqrtPriceFromInput"
      | "getNextSqrtPriceFromOutput"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getAmount0Delta",
    values: [BigNumberish, BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getAmount1Delta",
    values: [BigNumberish, BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getGasCostOfGetAmount0Delta",
    values: [BigNumberish, BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getGasCostOfGetAmount1Delta",
    values: [BigNumberish, BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getGasCostOfGetNextSqrtPriceFromInput",
    values: [BigNumberish, BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getGasCostOfGetNextSqrtPriceFromOutput",
    values: [BigNumberish, BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getNextSqrtPriceFromInput",
    values: [BigNumberish, BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getNextSqrtPriceFromOutput",
    values: [BigNumberish, BigNumberish, BigNumberish, boolean]
  ): string;

  decodeFunctionResult(
    functionFragment: "getAmount0Delta",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAmount1Delta",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGasCostOfGetAmount0Delta",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGasCostOfGetAmount1Delta",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGasCostOfGetNextSqrtPriceFromInput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGasCostOfGetNextSqrtPriceFromOutput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextSqrtPriceFromInput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextSqrtPriceFromOutput",
    data: BytesLike
  ): Result;
}

export interface SqrtPriceMathTest extends BaseContract {
  connect(runner?: ContractRunner | null): SqrtPriceMathTest;
  waitForDeployment(): Promise<this>;

  interface: SqrtPriceMathTestInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getAmount0Delta: TypedContractMethod<
    [
      sqrtLower: BigNumberish,
      sqrtUpper: BigNumberish,
      liquidity: BigNumberish,
      roundUp: boolean
    ],
    [bigint],
    "view"
  >;

  getAmount1Delta: TypedContractMethod<
    [
      sqrtLower: BigNumberish,
      sqrtUpper: BigNumberish,
      liquidity: BigNumberish,
      roundUp: boolean
    ],
    [bigint],
    "view"
  >;

  getGasCostOfGetAmount0Delta: TypedContractMethod<
    [
      sqrtLower: BigNumberish,
      sqrtUpper: BigNumberish,
      liquidity: BigNumberish,
      roundUp: boolean
    ],
    [bigint],
    "view"
  >;

  getGasCostOfGetAmount1Delta: TypedContractMethod<
    [
      sqrtLower: BigNumberish,
      sqrtUpper: BigNumberish,
      liquidity: BigNumberish,
      roundUp: boolean
    ],
    [bigint],
    "view"
  >;

  getGasCostOfGetNextSqrtPriceFromInput: TypedContractMethod<
    [
      sqrtP: BigNumberish,
      liquidity: BigNumberish,
      amountIn: BigNumberish,
      zeroForOne: boolean
    ],
    [bigint],
    "view"
  >;

  getGasCostOfGetNextSqrtPriceFromOutput: TypedContractMethod<
    [
      sqrtP: BigNumberish,
      liquidity: BigNumberish,
      amountOut: BigNumberish,
      zeroForOne: boolean
    ],
    [bigint],
    "view"
  >;

  getNextSqrtPriceFromInput: TypedContractMethod<
    [
      sqrtP: BigNumberish,
      liquidity: BigNumberish,
      amountIn: BigNumberish,
      zeroForOne: boolean
    ],
    [bigint],
    "view"
  >;

  getNextSqrtPriceFromOutput: TypedContractMethod<
    [
      sqrtP: BigNumberish,
      liquidity: BigNumberish,
      amountOut: BigNumberish,
      zeroForOne: boolean
    ],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getAmount0Delta"
  ): TypedContractMethod<
    [
      sqrtLower: BigNumberish,
      sqrtUpper: BigNumberish,
      liquidity: BigNumberish,
      roundUp: boolean
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getAmount1Delta"
  ): TypedContractMethod<
    [
      sqrtLower: BigNumberish,
      sqrtUpper: BigNumberish,
      liquidity: BigNumberish,
      roundUp: boolean
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getGasCostOfGetAmount0Delta"
  ): TypedContractMethod<
    [
      sqrtLower: BigNumberish,
      sqrtUpper: BigNumberish,
      liquidity: BigNumberish,
      roundUp: boolean
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getGasCostOfGetAmount1Delta"
  ): TypedContractMethod<
    [
      sqrtLower: BigNumberish,
      sqrtUpper: BigNumberish,
      liquidity: BigNumberish,
      roundUp: boolean
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getGasCostOfGetNextSqrtPriceFromInput"
  ): TypedContractMethod<
    [
      sqrtP: BigNumberish,
      liquidity: BigNumberish,
      amountIn: BigNumberish,
      zeroForOne: boolean
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getGasCostOfGetNextSqrtPriceFromOutput"
  ): TypedContractMethod<
    [
      sqrtP: BigNumberish,
      liquidity: BigNumberish,
      amountOut: BigNumberish,
      zeroForOne: boolean
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getNextSqrtPriceFromInput"
  ): TypedContractMethod<
    [
      sqrtP: BigNumberish,
      liquidity: BigNumberish,
      amountIn: BigNumberish,
      zeroForOne: boolean
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getNextSqrtPriceFromOutput"
  ): TypedContractMethod<
    [
      sqrtP: BigNumberish,
      liquidity: BigNumberish,
      amountOut: BigNumberish,
      zeroForOne: boolean
    ],
    [bigint],
    "view"
  >;

  filters: {};
}
