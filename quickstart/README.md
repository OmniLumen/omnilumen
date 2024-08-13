# OmniLumen CLI

OmniLumen CLI is a command-line interface for interacting with the Stellar network. It wraps around the Stellar CLI and provides additional functionality for easier usage.

## Installation

To install the OmniLumen CLI, ensure you have Node.js installed and then run:

```sh
npm install -g omnilumen-cli
```
## Usage
### Display Menu

To display the interactive menu, simply run:
```sh
node bin/omnilumen-quickstart.js
```
### Stellar CLI Commands

The OmniLumen CLI supports a variety of commands for interacting with the Stellar network. Below are detailed instructions and examples for each command.

#### Contract Commands
- Deploy a Contract
```sh
omnilumen-cli stellar contract deploy --source S... --network testnet --wasm-hash <hex-encoded-wasm-hash>

```
- Version Command
```sh
omnilumen-cli stellar version

```
- Events Command
```sh
omnilumen-cli stellar events [options]

```
- Keys Command
```sh
omnilumen-cli stellar keys [options]

```
- Network Command
```sh
omnilumen-cli stellar network [options]

```
- Snapshot Command
```sh
omnilumen-cli stellar snapshot [options]
```
- Tx Command
```sh
omnilumen-cli stellar tx [options]
```
- XDR Command
```sh
omnilumen-cli stellar xdr [options]
```
- Completion Command
```sh
omnilumen-cli stellar completion [options]
```
- Cache Command
```sh
omnilumen-cli stellar cache [options]
```