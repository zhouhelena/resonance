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
} from "../../../../common";

export interface IUniswapV3PoolStateInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "feeGrowthGlobal0X128"
      | "feeGrowthGlobal1X128"
      | "liquidity"
      | "observations"
      | "positions"
      | "protocolFees"
      | "slot0"
      | "tickBitmap"
      | "ticks"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "feeGrowthGlobal0X128",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "feeGrowthGlobal1X128",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "liquidity", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "observations",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "positions",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "protocolFees",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "slot0", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tickBitmap",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "ticks", values: [BigNumberish]): string;

  decodeFunctionResult(
    functionFragment: "feeGrowthGlobal0X128",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "feeGrowthGlobal1X128",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "liquidity", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "observations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "positions", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "protocolFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "slot0", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tickBitmap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ticks", data: BytesLike): Result;
}

export interface IUniswapV3PoolState extends BaseContract {
  connect(runner?: ContractRunner | null): IUniswapV3PoolState;
  waitForDeployment(): Promise<this>;

  interface: IUniswapV3PoolStateInterface;

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

  feeGrowthGlobal0X128: TypedContractMethod<[], [bigint], "view">;

  feeGrowthGlobal1X128: TypedContractMethod<[], [bigint], "view">;

  liquidity: TypedContractMethod<[], [bigint], "view">;

  observations: TypedContractMethod<
    [index: BigNumberish],
    [
      [bigint, bigint, bigint, boolean] & {
        blockTimestamp: bigint;
        tickCumulative: bigint;
        secondsPerLiquidityCumulativeX128: bigint;
        initialized: boolean;
      }
    ],
    "view"
  >;

  positions: TypedContractMethod<
    [key: BytesLike],
    [
      [bigint, bigint, bigint, bigint, bigint] & {
        _liquidity: bigint;
        feeGrowthInside0LastX128: bigint;
        feeGrowthInside1LastX128: bigint;
        tokensOwed0: bigint;
        tokensOwed1: bigint;
      }
    ],
    "view"
  >;

  protocolFees: TypedContractMethod<
    [],
    [[bigint, bigint] & { token0: bigint; token1: bigint }],
    "view"
  >;

  slot0: TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint, bigint, bigint, boolean] & {
        sqrtPriceX96: bigint;
        tick: bigint;
        observationIndex: bigint;
        observationCardinality: bigint;
        observationCardinalityNext: bigint;
        feeProtocol: bigint;
        unlocked: boolean;
      }
    ],
    "view"
  >;

  tickBitmap: TypedContractMethod<
    [wordPosition: BigNumberish],
    [bigint],
    "view"
  >;

  ticks: TypedContractMethod<
    [tick: BigNumberish],
    [
      [bigint, bigint, bigint, bigint, bigint, bigint, bigint, boolean] & {
        liquidityGross: bigint;
        liquidityNet: bigint;
        feeGrowthOutside0X128: bigint;
        feeGrowthOutside1X128: bigint;
        tickCumulativeOutside: bigint;
        secondsPerLiquidityOutsideX128: bigint;
        secondsOutside: bigint;
        initialized: boolean;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "feeGrowthGlobal0X128"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "feeGrowthGlobal1X128"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "liquidity"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "observations"
  ): TypedContractMethod<
    [index: BigNumberish],
    [
      [bigint, bigint, bigint, boolean] & {
        blockTimestamp: bigint;
        tickCumulative: bigint;
        secondsPerLiquidityCumulativeX128: bigint;
        initialized: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "positions"
  ): TypedContractMethod<
    [key: BytesLike],
    [
      [bigint, bigint, bigint, bigint, bigint] & {
        _liquidity: bigint;
        feeGrowthInside0LastX128: bigint;
        feeGrowthInside1LastX128: bigint;
        tokensOwed0: bigint;
        tokensOwed1: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "protocolFees"
  ): TypedContractMethod<
    [],
    [[bigint, bigint] & { token0: bigint; token1: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "slot0"
  ): TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint, bigint, bigint, boolean] & {
        sqrtPriceX96: bigint;
        tick: bigint;
        observationIndex: bigint;
        observationCardinality: bigint;
        observationCardinalityNext: bigint;
        feeProtocol: bigint;
        unlocked: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "tickBitmap"
  ): TypedContractMethod<[wordPosition: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "ticks"
  ): TypedContractMethod<
    [tick: BigNumberish],
    [
      [bigint, bigint, bigint, bigint, bigint, bigint, bigint, boolean] & {
        liquidityGross: bigint;
        liquidityNet: bigint;
        feeGrowthOutside0X128: bigint;
        feeGrowthOutside1X128: bigint;
        tickCumulativeOutside: bigint;
        secondsPerLiquidityOutsideX128: bigint;
        secondsOutside: bigint;
        initialized: boolean;
      }
    ],
    "view"
  >;

  filters: {};
}