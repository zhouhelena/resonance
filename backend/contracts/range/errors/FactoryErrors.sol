//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

library FactoryErrors {
    error ZeroPoolAddress();
    error NoVaultInitDataProvided();
    error MismatchedVaultsAndImplsLength();
    error VaultUpgradeFailed();
    error ImplIsNotAContract();
    error SameTokensAddresses();
}
