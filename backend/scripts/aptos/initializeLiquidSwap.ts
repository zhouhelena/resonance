import { Account, AccountAddress, Aptos, AptosConfig, Network, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";

import "dotenv/config";

let TOKENS_ADDRESS = process.env.APTOS_TOKENS_ADDRESS || "";
let AMM_ADDRESS = process.env.APTOS_AMM_ADDRESS || "";
let PRIVATE_KEY = process.env.APTOS_PRIVATE_KEY || "";

let network = Network.TESTNET;
const config = new AptosConfig({ network });
const client = new Aptos(config);


async function main() {
    const account2 = Account.generate();
    console.log("Using account:", account2.accountAddress.toString());
    console.log(account2.privateKey.toString());

    const privateKey = new Ed25519PrivateKey(PRIVATE_KEY);
    const account = Account.fromPrivateKey({ privateKey: privateKey });
    console.log("Using account:", account.accountAddress.toString());

    const initializeLpTx = await client.transaction.build.simple({
        sender: account.accountAddress,
        data: {
            function: `${AMM_ADDRESS}::lp_account::initialize_lp_account`,
            typeArguments: [],
            functionArguments: ["LiquidToken", "LS"],
        },
    });

    let senderAuthenticator = client.transaction.sign({ signer: account, transaction: initializeLpTx });
    let pendingTxn = await client.transaction.submit.simple({ transaction: initializeLpTx, senderAuthenticator });
    await client.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Initialize liquidity account");

    const initializeTx = await client.transaction.build.simple({
        sender: account.accountAddress,
        data: {
            function: `${AMM_ADDRESS}::liquidity_pool::initialize`,
            typeArguments: [],
            functionArguments: [],
        },
    });

    senderAuthenticator = client.transaction.sign({ signer: account, transaction: initializeTx });
    pendingTxn = await client.transaction.submit.simple({ transaction: initializeTx, senderAuthenticator });
    await client.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Initialize liquidity pool");

    const registerPoolTx = await client.transaction.build.simple({
        sender: account.accountAddress,
        data: {
            function: `${AMM_ADDRESS}::scripts_v2::register_pool_and_add_liquidity`,
            typeArguments: [`${TOKENS_ADDRESS}::apt::APT`, `${TOKENS_ADDRESS}::zusdc::ZUSDC`, `${AMM_ADDRESS}::curves::Uncorrelated`],
            functionArguments: [1_000, 10, 1_000, 10],
        },
    });

    senderAuthenticator = client.transaction.sign({ signer: account, transaction: registerPoolTx });
    pendingTxn = await client.transaction.submit.simple({ transaction: registerPoolTx, senderAuthenticator });
    await client.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Registered zUSDC-APT pool");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
