module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545, // If you're on Ganache, change the port to 7545 which is Ganache's default port.
      network_id: "*", // Match any network id. You may need to replace * with your network Id
      from: "", // Add your unlocked account within the double quotes
      gas: 4444444
    }
  }
};
