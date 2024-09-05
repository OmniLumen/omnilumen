# OmniLumen CLI

OmniLumen CLI (ocli) is a powerful command-line interface designed for interacting with the Stellar network. It wraps around the Stellar CLI, adding enhanced functionality for streamlined operations, making it easier for developers to manage their Stellar-related tasks.
## Installation

To install the OmniLumen CLI, ensure Node.js is installed, and then run the following command:

```sh
npm install -g omnilumen@latest
```
## Usage
### Interactive Menu

After installation, you can access the OmniLumen interactive menu by simply running:

```sh
ocli
```
### example Commands
OmniLumen CLI supports various commands for managing Stellar operations. Below are a few examples:

#### Detailed CLI Overview

For more detailed documentation and command usage examples, visit [OmniLumen CLI Overview](https://www.omnilumen.net/cliOverview).

#### Contract Commands
- Deploy a Contract
```sh
	
scli contract deploy --source S... --network testnet --wasm-hash <hex-encoded-wasm-hash>

```
- Events Command
```sh
scli events [options]

```
- Keys Command
```sh
scli keys [options]

```
- Network Command
```sh
scli network [options]

```
- Snapshot Command
```sh
scli snapshot [options]
```
- Tx Command
```sh
scli tx [options]
```
- XDR Command
```sh
scli xdr [options]
```
- Completion Command
```sh
scli completion [options]
```
- Cache Command
```sh
scli cache [options]
```