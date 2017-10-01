module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id. You may need to replace * with your network Id
      from: "" // Add your unlocked account within the double quotes
    }
  }
};
