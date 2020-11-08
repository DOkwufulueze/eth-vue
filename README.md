[![Made in Nigeria](https://img.shields.io/badge/made%20in-nigeria-008751.svg?style=flat-square)](https://github.com/acekyd/made-in-nigeria)
## eth-vue Truffle Box: With Ganache Blockchain Option, Ropsten Network Configuration, and Gravatar access
<br><br>
![eth-vue](https://raw.githubusercontent.com/DOkwufulueze/eth-vue/master/box-img-lg.png)

This Truffle Box provides everything you need to quickly build Ethereum dApps that have authentication features with [Vue 3](https://github.com/vuejs/vue-next), including configuration for easy deployment to the Ropsten Network. It's also Gravatar-enabled. Connecting to a running [Ganache](https://github.com/trufflesuite/ganache) blockchain network from Truffle is also possible -- for fast development and testing purposes.<br>
Built on [Truffle 5](https://github.com/trufflesuite/truffle/releases), [eth-vue](https://github.com/DOkwufulueze/eth-vue) uses [vuex](https://github.com/vuejs/vuex) for state management, [vuex-persist](https://github.com/championswimmer/vuex-persist) for local storage of app state, and [vue-router](https://github.com/vuejs/vue-router) for routing.
Authentication functionalities are handled by Smart Contracts running on the Ethereum blockchain.

With deployment configuration for the Ropsten Network, deployment to the remote test network doesn't have to be a pain anymore. It's now as simple as `truffle migrate --network ropsten`

If you have a running Ganache blockchain network, configuring with [eth-vue](https://github.com/DOkwufulueze/eth-vue) will connect you immediately to the private blockchain. Visit the [Ganache](https://github.com/trufflesuite/ganache) page for installation and startup instructions, install Ganache, and [eth-vue](https://github.com/DOkwufulueze/eth-vue) will connect accordingly.

Simply unbox and start building your own dApp.

## Installation
- Install Truffle

        yarn global add truffle

<br>

###### NOTE: If unboxing DOkwufulueze/eth-vue had failed previously due to absence of node-gyp, simply run `yarn global add node-gyp`. Or if it failed due to a problem with an existing node-gyp, run `node-gyp rebuild`. Else ignore this note and move on to the next instruction

<br>

- Enter your development directory [eg. cd into a newly created `eth-vue` directory] and unbox `DOkwufulueze/eth-vue`

        truffle unbox DOkwufulueze/eth-vue
    Or clone this repository from GitHub and `cd` into the `eth-vue` directory:

        git clone https://github.com/DOkwufulueze/eth-vue.git

<br>

- Configure your environment
  - Open the `truffle.js` file. You'll find the following:

        ...
        module.exports = {
          ...
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
    Insert your unlocked account within the double-quotes of the `from` key

  - Open the `src/util/constants.js` file. You'll find the following:

        export const NETWORKS = {
          '1': 'Main Net',
          '2': 'Deprecated Morden test network',
          '3': 'Ropsten test network',
          '4': 'Rinkeby test network',
          '42': 'Kovan test network',
          '4447': 'Truffle Develop Network',
          '5777': 'Ganache Blockchain',
          '666': 'Daniel Private Blockchain' // This is a test private blockchain. You can change it to your own private blockchain if you have one.
        };

        export const APPROVED_NETWORK_ID = "3"; // Default is Ropsten. Set as you choose
        ...

    The default network above is the Ropsten network [`APPROVED_NETWORK_ID = '3'`], but you can change this, as Ropsten was chosen for testing purpose only.<br>
    If your choice network is on the list of `NETWORKS` but is not Ropsten, then change the value of `APPROVED_NETWORK_ID` to the ID of your choice network. For example, if one is to use the private Blockchain above [`'666': 'Daniel Private Blockchain'`], then `APPROVED_NETWORK_ID` would be `'666'`.<br>
    But if your choice network is not on the `NETWORKS` list, simply add your network using the existing pattern [`<networkId>: <networkName>`], and change the value of `APPROVED_NETWORK_ID` to the ID of your choice network.<br>
    If you're using Ganache, please remember to point your Ethereum provider [Metamask, for example] to a Custom RPC running on port 7545.<br>
    For Truffle develop network, point your Ethereum provider [Metamask, for example] to a Custom RPC running on port 9545.
<br>

- Install dependencies if necessary.

     ###### NOTE: If you unboxed this boilerplate from Truffle [`truffle unbox DOkwufulueze/eth-vue`], then running `yarn install` is not necessary since unboxing installs dependencies by default. But if you cloned this boilerplate from GitHub [`git clone https://github.com/DOkwufulueze/eth-vue.git`], please run `yarn install` as stated below

        yarn install
<br>

## Compilation and Migration
To deploy the contracts, you can either compile and migrate to your custom network as configured in the `truffle.js` file or you could use the test network and test addresses that truffle 4 provides. Find details for both deployment processes below.

### Compile and Migrate to your custom network as configured in `truffle.js`. [For the [Ganache](https://github.com/trufflesuite/ganache) Blockchain, it runs on port 7545 and doesn't conflict with any conventional port. So edit your `truffle.js` file appropriately before deploying]

- Compile the Contracts [remember to add the `--network ropsten` option if you didn't change the `APPROVED_NETWORK_ID` in `src/util/constants.js` from the default `3` to another id]

        truffle compile
<br>

- Deploy the compiled contracts [remember to add the `--network ropsten` option if you didn't change the `APPROVED_NETWORK_ID` in `src/util/constants.js` from the default `3` to another id]

        truffle migrate
<br>

### Compile and Migrate to the Ropsten test network [this is very straightforward]

- Compile the Contracts on Ropsten

        truffle compile --network ropsten
<br>

- Deploy the compiled Contracts to Ropsten

        truffle migrate --network ropsten
<br>

### Compile and Migrate using the `truffle develop` environment
<br>

The default port for `truffle develop` is 9545, so it doesn't conflict with any conventional port. Edit `truffle.js` appropriately.
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

        yarn start
<br>

- The `eth-vue` DApp should now be running on http://localhost:3001 as you can see from your browser.

## And that's it, you're DONE!

<br><br>
### Please send bug issues you may encounter to [Issues](https://github.com/DOkwufulueze/eth-vue/issues)
<br><br>
## Copyleft
![Copyleft](https://raw.githubusercontent.com/DOkwufulueze/eth-vue/master/static/images/copyleft.png) 2017 Daniel Okwufulueze
<br><br>
## Licence
This dApp is distributed under the [GNU GPL-3.0](https://github.com/DOkwufulueze/eth-vue/blob/master/LICENCE.md) licence.
