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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface SenderInterface extends Interface {
  getFunction(nameOrSignature: "sendTokens"): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "TokensSent"): EventFragment;

  encodeFunctionData(
    functionFragment: "sendTokens",
    values: [BigNumberish, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "sendTokens", data: BytesLike): Result;
}

export namespace TokensSentEvent {
  export type InputTuple = [
    messageId: BytesLike,
    destinationChainSelector: BigNumberish,
    receiver: AddressLike,
    amount: BigNumberish,
    feeToken: AddressLike,
    fees: BigNumberish
  ];
  export type OutputTuple = [
    messageId: string,
    destinationChainSelector: bigint,
    receiver: string,
    amount: bigint,
    feeToken: string,
    fees: bigint
  ];
  export interface OutputObject {
    messageId: string;
    destinationChainSelector: bigint;
    receiver: string;
    amount: bigint;
    feeToken: string;
    fees: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Sender extends BaseContract {
  connect(runner?: ContractRunner | null): Sender;
  waitForDeployment(): Promise<this>;

  interface: SenderInterface;

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

  sendTokens: TypedContractMethod<
    [
      destinationChainSelector: BigNumberish,
      receiver: AddressLike,
      amount: BigNumberish
    ],
    [string],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "sendTokens"
  ): TypedContractMethod<
    [
      destinationChainSelector: BigNumberish,
      receiver: AddressLike,
      amount: BigNumberish
    ],
    [string],
    "nonpayable"
  >;

  getEvent(
    key: "TokensSent"
  ): TypedContractEvent<
    TokensSentEvent.InputTuple,
    TokensSentEvent.OutputTuple,
    TokensSentEvent.OutputObject
  >;

  filters: {
    "TokensSent(bytes32,uint64,address,uint256,address,uint256)": TypedContractEvent<
      TokensSentEvent.InputTuple,
      TokensSentEvent.OutputTuple,
      TokensSentEvent.OutputObject
    >;
    TokensSent: TypedContractEvent<
      TokensSentEvent.InputTuple,
      TokensSentEvent.OutputTuple,
      TokensSentEvent.OutputObject
    >;
  };
}
