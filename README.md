# eth-vue Truffle Box: Ganache Blockchain configuration included
This Truffle Box provides everything you need to quickly build Ethereum dApps that have authentication features with [vue](https://github.com/vuejs/vue), including configuration for an entire blockchain from Truffle -- [Ganache](https://github.com/trufflesuite/ganache) for development and testing purposes.<br>
Built on [Truffle 4](https://github.com/trufflesuite/truffle/releases), it uses [vuex](https://github.com/vuejs/vuex) for state management, [vuex-persist](https://github.com/championswimmer/vuex-persist) for local storage of app state, and [vue-router](https://github.com/vuejs/vue-router) for routing.
Authentication functionalities are handled by Smart Contracts running on the Ethereum blockchain.

Again, you no longer have to worry about setting up your private blockchain while developing, eth-vue now comes with configuration for the new Truffle blockchain: [Ganache](https://github.com/trufflesuite/ganache). Visit the [Ganache](https://github.com/trufflesuite/ganache) page for installation and startup instructions, install Ganache, and eth-vue will connect accordingly.

Simply unbox and start building your own dApp.

## Installation
- Install Truffle

        npm install -g truffle
<br>

- Enter your development directory and unbox `DOkwufulueze/eth-vue`

        truffle unbox DOkwufulueze/eth-vue
<br>

- Configure your environment
  - Open the `truffle.js` file. You'll find the following:

        module.exports = {
          networks: {
            development: {
              host: "localhost",
              port: 7545, // This is the Ganache default port. You can change it to the conventional 8545 if your provider runs on 8545
              network_id: "*", // Match any network id. You may need to replace * with your network Id
              from: "", // Add your unlocked account within the double quotes
              gas: 4444444
            }
          }
        };
    Insert your unlocked account within the double-quotes of the `from` key

  - Open the `src/util/constants.js` file. You'll find the following:

        export const NETWORKS = {
          '1': 'Main Net',
          '2': 'Deprecated Morden test network',
          '3': 'Ropsten test network',
          '4': 'Rinkeby test network',
          '42': 'Kovan test network',
          '4447': 'Truffle Develop Network',
          '5777': 'Ganache Blockchain'
        }

        export const APPROVED_NETWORK_ID = '5777'

    The default network above is the [Ganache](https://github.com/trufflesuite/ganache) Blockchain network [`APPROVED_NETWORK_ID = '5777'`], but you can change this, as Ganache was chosen for fast development and testing purposes only.<br>
    If your choice network is on the list of `NETWORKS` but is not Ganache, then change the value of `APPROVED_NETWORK_ID` to the ID of your choice network. But if your choice network is not on the `NETWORKS` list, then add your network using the existing pattern [`<networkId>: <networkName>`], and change the value of `APPROVED_NETWORK_ID` to the ID of your choice network.<br>
    If you're using Ganache, please remember to point your Ethereum provider [Metamask, for example] to a Custom RPC running on port 7545.
<br>

- Install npm dependencies

        npm install
<br>

## Compilation and Migration
To deploy the contracts, you can either compile and migrate to your custom network as configured in the `truffle.js` file or you could use the test network and test addresses that truffle 4 provides. Find details for both deployment processes below.

### Compile and Migrate to your custom network as configured in `truffle.js`. [For the [Ganache](https://github.com/trufflesuite/ganache) Blockchain, it runs on port 7545 and doesn't conflict with any conventional port. So edit your `truffle.js` file appropriately before deploying]

- Compile the Contracts

        truffle compile
<br>

- Deploy the compiled contracts

        truffle migrate
<br>

### Compile and Migrate using the `truffle develop` environment
<br>

The default port for `truffle develop` is 9545, so it doesn't conflict with any conventional port.
- Enter the `truffle develop` environment

        truffle develop
<br>

- Compile the Contracts

        compile
<br>

- Deploy the compiled contracts

        migrate
<br>

## Launch the dApp
- Start the server

        npm run start
<br>

- Open your browser and enter the following:

        localhost:3001

## And that's it, you're DONE.

<br><br>
### Please send bug issues you may encounter to [Issues](https://github.com/DOkwufulueze/eth-vue/issues)
<br><br>
## Copyleft
![Copyleft](/static/images/copyleft.png) 2017 Daniel Okwufulueze
<br><br>
## Licence
This dApp is distributed under the [GNU GPL-3.0](https://github.com/DOkwufulueze/eth-vue/blob/master/LICENCE.md) licence.
