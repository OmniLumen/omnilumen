# OmniLumen - Streamlining Stellar and Soroban Development

Visit our official website: https://www.omnilumen.net

OmniLumen is a Stellar development tool integrating Stellar CLI, quickstart scripts, BigQuery for data analysis, and local LLMs for AI capabilities. It streamlines blockchain development with core features, testing tools, and utilities.

As a Stellar developer, managing various aspects of the development process can often feel overwhelming. From setting up a local environment to running complex CLI commands and integrating tools for data analysis and wallet management, developers face the challenge of juggling multiple configurations. OmniLumen simplifies this process by offering a unified solution that brings together all these tasks into a cohesive framework, designed to streamline Stellar and Soroban development.


## Features

- ### OmniLumen CLI (scli):
  
   Wraps Stellar CLI with additional commands for easier interaction with the Stellar network.

- ### OmniLumen Quickstart (sqs) 

  Quickly set up local development environments with Docker, supporting Testnet and Futurenet.

## Installation

To install OmniLumen CLI and Quickstart, run:

```sh
npm install -g omnilumen@latest
```

## Quickstart Examples

###  Start Local Network:

```sh
sqs local
```

###  Shut Down:

```sh
sqs down
```

## CLI Examples

###  Generate a new key pair (public and private key).

```
scli keys generate --global alice --network testnet"
```

###  Deploy Contract

```
scli contract deploy \
--wasm target/wasm32-unknown-unknown/release/hello_world.wasm \
--source alice \
--network testnet

```


## More Info

For detailed documentation, visit:

[OmniLumen CLI Overview](https://www.omnilumen.net/cliOverview)

[OmniLumen Quick Start Overview](https://www.omnilumen.net/quickStartOverview)
