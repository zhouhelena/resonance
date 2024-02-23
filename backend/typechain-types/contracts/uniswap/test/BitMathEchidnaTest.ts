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

export interface BitMathEchidnaTestInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "leastSignificantBitInvariant"
      | "mostSignificantBitInvariant"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "leastSignificantBitInvariant",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mostSignificantBitInvariant",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "leastSignificantBitInvariant",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mostSignificantBitInvariant",
    data: BytesLike
  ): Result;
}

export interface BitMathEchidnaTest extends BaseContract {
  connect(runner?: ContractRunner | null): BitMathEchidnaTest;
  waitForDeployment(): Promise<this>;

  interface: BitMathEchidnaTestInterface;

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

  leastSignificantBitInvariant: TypedContractMethod<
    [input: BigNumberish],
    [void],
    "view"
  >;

  mostSignificantBitInvariant: TypedContractMethod<
    [input: BigNumberish],
    [void],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "leastSignificantBitInvariant"
  ): TypedContractMethod<[input: BigNumberish], [void], "view">;
  getFunction(
    nameOrSignature: "mostSignificantBitInvariant"
  ): TypedContractMethod<[input: BigNumberish], [void], "view">;

  filters: {};
}