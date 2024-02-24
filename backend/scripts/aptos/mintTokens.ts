import { Account, AccountAddress, Aptos, AptosConfig, Network, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";

import "dotenv/config";

let TOKENS_ADDRESS = process.env.APTOS_TOKENS_ADDRESS || "";
let PRIVATE_KEY = process.env.APTOS_PRIVATE_KEY || "";

let network = Network.TESTNET;
const config = new AptosConfig({ network });
const client = new Aptos(config);


async function main() {
    const privateKey = new Ed25519PrivateKey(PRIVATE_KEY);
    const account = Account.fromPrivateKey({ privateKey: privateKey });
    console.log("Using account:", account.accountAddress.toString());

    const registerUSDCTx = await client.transaction.build.simple({
        sender: account.accountAddress,
        data: {
            function: "0x1::managed_coin::register",
            typeArguments: [`${TOKENS_ADDRESS}::zusdc::ZUSDC`],
            functionArguments: [],
        },
    });

    let senderAuthenticator = client.transaction.sign({ signer: account, transaction: registerUSDCTx });
    let pendingTxn = await client.transaction.submit.simple({ transaction: registerUSDCTx, senderAuthenticator });
    await client.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Registered zUSDC");

    const registerAPTTx = await client.transaction.build.simple({
        sender: account.accountAddress,
        data: {
            function: "0x1::managed_coin::register",
            typeArguments: [`${TOKENS_ADDRESS}::apt::APT`],
            functionArguments: [],
        },
    });

    senderAuthenticator = client.transaction.sign({ signer: account, transaction: registerAPTTx });
    pendingTxn = await client.transaction.submit.simple({ transaction: registerAPTTx, senderAuthenticator });
    await client.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Registered APT");

    const mintUSDCTx = await client.transaction.build.simple({
        sender: account.accountAddress,
        data: {
            function: "0x1::managed_coin::mint",
            typeArguments: [`${TOKENS_ADDRESS}::zusdc::ZUSDC`],
            functionArguments: [account.accountAddress, 1_000_000],
        },
    });

    senderAuthenticator = client.transaction.sign({ signer: account, transaction: mintUSDCTx });
    pendingTxn = await client.transaction.submit.simple({ transaction: mintUSDCTx, senderAuthenticator });
    await client.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Minted 1,000,000 zUSDC");

    const mintAPTTx = await client.transaction.build.simple({
        sender: account.accountAddress,
        data: {
            function: "0x1::managed_coin::mint",
            typeArguments: [`${TOKENS_ADDRESS}::apt::APT`],
            functionArguments: [account.accountAddress, 1_000_000],
        },
    });

    senderAuthenticator = client.transaction.sign({ signer: account, transaction: mintAPTTx });
    pendingTxn = await client.transaction.submit.simple({ transaction: mintAPTTx, senderAuthenticator });
    await client.waitForTransaction({ transactionHash: pendingTxn.hash });
    console.log("Minted 1,000,000 APT");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
