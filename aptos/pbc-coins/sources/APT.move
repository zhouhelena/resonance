module PBCTestTokens::apt {
    struct APT {}

    fun init_module(sender: &signer) {
        aptos_framework::managed_coin::initialize<APT>(
            sender,
            b"Aptos Token",
            b"APT",
            6,
            false,
        );
    }
}