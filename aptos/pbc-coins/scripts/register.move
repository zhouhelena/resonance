script {
    fun register(account: &signer) {
        aptos_framework::managed_coin::register<PBCTestTokens::zusdc::ZUSDC>(account);
        aptos_framework::managed_coin::register<PBCTestTokens::apt::APT>(account);
    }
}
