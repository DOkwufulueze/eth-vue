const bip39 = require("bip39");
const hdkey = require("ethereumjs-wallet/dist/hdkey");
const ProviderEngine = require("web3-provider-engine");
const WalletSubprovider = require("web3-provider-engine/subproviders/wallet.js");
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc.js");
const FilterSubprovider = require("web3-provider-engine/subproviders/filters.js");
const Web3 = require("web3");

// Get our mnemonic and create an hdwallet
var mnemonic =
  "piano file obey immense polar rack great subject clutch camera maid ostrich";
var hdwallet = hdkey.default.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));

// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/";
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
var address = "0x" + wallet.getAddress().toString("hex");

var providerUrl = "https://testnet.infura.io";
var engine = new ProviderEngine();

// pass the engine to Web3 - this next line is necessary
/* eslint-disable no-unused-vars */
var web3 = new Web3(engine);

// filters
engine.addProvider(new FilterSubprovider());

engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(
  new RPCSubprovider({
    rpcUrl: providerUrl
  })
);
engine.start(); // Required by the provider engine.

module.exports = {
  compilers: {
    solc: {
      version: "0.7.4",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  },
  networks: {
    ropsten: {
      network_id: 3, // Official ropsten network id
      provider: engine, // Use the custom provider
      from: address, // Use the address derived address
      gas: 4444444
    },
    development: {
      host: "localhost",
      port: 8545, // This is the conventional port. If you're using the Ganache Blockchain, change port value to the Ganache default port 7545. If you're using Truffle develop network, change port value to 9545
      network_id: "666", // Match any network id. You may need to replace * with your network Id
      from: "", // Add your unlocked account within the double quotes
      gas: 4444444
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777,
      from: "", // Findable under Ganache -> Addresses. Auth with Metamask and private key
      gas: 4444444
    }
  }
};
