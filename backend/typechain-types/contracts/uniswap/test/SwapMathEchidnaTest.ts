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

export interface SwapMathEchidnaTestInterface extends Interface {
  getFunction(
    nameOrSignature: "checkComputeSwapStepInvariants"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkComputeSwapStepInvariants",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkComputeSwapStepInvariants",
    data: BytesLike
  ): Result;
}

export interface SwapMathEchidnaTest extends BaseContract {
  connect(runner?: ContractRunner | null): SwapMathEchidnaTest;
  waitForDeployment(): Promise<this>;

  interface: SwapMathEchidnaTestInterface;

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

  checkComputeSwapStepInvariants: TypedContractMethod<
    [
      sqrtPriceRaw: BigNumberish,
      sqrtPriceTargetRaw: BigNumberish,
      liquidity: BigNumberish,
      amountRemaining: BigNumberish,
      feePips: BigNumberish
    ],
    [void],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "checkComputeSwapStepInvariants"
  ): TypedContractMethod<
    [
      sqrtPriceRaw: BigNumberish,
      sqrtPriceTargetRaw: BigNumberish,
      liquidity: BigNumberish,
      amountRemaining: BigNumberish,
      feePips: BigNumberish
    ],
    [void],
    "view"
  >;

  filters: {};
}
