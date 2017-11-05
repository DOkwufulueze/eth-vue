# eth-vue
A [vue](https://github.com/vuejs/vue) boilerplate for Ethereum dApps, built on [Truffle 4](https://github.com/trufflesuite/truffle/releases). Uses [vuex](https://github.com/vuejs/vuex) for state management, [vuex-persist](https://github.com/championswimmer/vuex-persist) for local storage of app state, and [vue-router](https://github.com/vuejs/vue-router) for routing.
Authentication functionalities are handled by Smart Contracts running on the Ethereum blockchain.

Simply clone and start building your own dApp.

## Installation
- Install Truffle

        npm install -g truffle
<br>

- Clone this repo

        git clone git@github.com:DOkwufulueze/eth-vue.git
<br>

- Enter the boilerplate

        cd eth-vue
<br>

- Configure your environment
  - Open the `truffle.js` file. You'll find the following:

        module.exports = {
          networks: {
            development: {
              host: "localhost",
              port: 8545,
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
          '666': 'Private Test Network'
        }

        export const APPROVED_NETWORK_ID = '3'

    The default network above is the Ropsten test network [`APPROVED_NETWORK_ID = '3'`], but you can change this.<br>
    If your choice network is on the list of `NETWORKS` but is not Ropsten, then change the value of `APPROVED_NETWORK_ID` to the ID of your choice network. But if your choice network is not on the `NETWORKS` list, then add your network using the existing pattern [`<networkId>: <networkName>`], and change the value of `APPROVED_NETWORK_ID` to the ID of your choice network.
<br>

- Install npm dependencies

        npm install
<br>

## Compilation and Migration
To deploy the contracts, you can either compile and migrate to your custom network as configured in the `truffle.js` file or you could use the test network and test addresses that truffle 4 provides. Find details for both deployment processes below.

### Compile and Migrate to your custom network as configured in `truffle.js`

- Compile the Contracts

        truffle compile
<br>

- Deploy the compiled contracts

        truffle migrate
<br>

### Compile and Migrate using the `truffle develop` environment
<br>

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
