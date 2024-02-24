module PBCTestTokens::zusdc {
    struct ZUSDC {}

    fun init_module(sender: &signer) {
        aptos_framework::managed_coin::initialize<ZUSDC>(
            sender,
            b"zUSDC",
            b"zUSDC",
            6,
            false,
        );
    }
}