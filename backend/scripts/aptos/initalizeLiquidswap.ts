import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

import "dotenv/config";

async function main() {
    const network = Network.LOCAL;
    const config = new AptosConfig({ network });
    const client = new Aptos(config);

    const account = Account.generate();
    await client.fundAccount({
        accountAddress: account.accountAddress,
        amount: 1000,
    });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
