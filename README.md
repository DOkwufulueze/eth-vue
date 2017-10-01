# eth-vue
A Vue.js boilerplate for Ethereum dApps, built on Truffle. Authentication functionalities included.

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
              from: "" // Add your unlocked account within the double quotes
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
          '42': 'Kovan test network'
        }

        export const APPROVED_NETWORK_ID = '3'

    The default network above is the Ropsten test network [`APPROVED_NETWORK_ID = '3'`], but you can change this.<br>
    If your choice network is on the list of `NETWORKS` but is not Ropsten, then change the value of `APPROVED_NETWORK_ID` to the ID of your choice network. But if your choice network is not on the `NETWORKS` list, then add your network using the existing pattern [`<networkId>: <networkName>`], and change the value of `APPROVED_NETWORK_ID` to the ID of your choice network.
<br>

- Install npm dependencies

        npm install
<br>

- Compile the Contracts

        truffle compile
<br>

- Deploy the compiled contracts

        truffle migrate
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
