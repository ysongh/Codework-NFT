const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "".toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    // truffle migrate --network kovan
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/<key>`),
      network_id: 42,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.6.12",    // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};