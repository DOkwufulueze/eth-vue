module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545, // This is the conventional port. If you're using the Ganache Blockchain, change port value to the Ganache default port 7545. If you're using Truffle develop network, change port value to 9545
      network_id: "*", // Match any network id. You may need to replace * with your network Id
      from: "", // Add your unlocked account within the double quotes
      gas: 4444444
    }
  }
};
