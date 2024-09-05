# OmniLumen Quickstart

OmniLumen Quickstart (sqs) is a tool that simplifies setting up a local Stellar development environment. It wraps around Stellar Quickstart with additional functionality, enabling developers to efficiently manage their Stellar network setup, test smart contracts, and interact with Stellar-related tools using Docker.
## Installation

To install OmniLumen Quickstart, ensure you have Node.js and Docker installed, and then run the following command:

```sh
npm install -g omnilumen@latest
```

This will install the sqs command, providing access to all OmniLumen Quickstart features.

## Usage
### Interactive Menu

After installation, you can access the OmniLumen interactive menu by simply running:

```sh
sqs
```
### example Commands
OmniLumen Quickstart supports various commands for managing Stellar operations. Below are a few examples:

#### Detailed Omnilumen Quick Start Overview

For more detailed documentation and command usage examples, visit [OmniLumen Quick Start Overview](https://www.omnilumen.net/quickStartOverview).

#### Local Network

- Starting a Local Network
```sh
	
sqs local

```
or you can run:
```sh
	
sqs up

```
- Start Local Development Network in Background
```sh
sqs local -d

```

### shutdown Network
- Shut Down the Quickstart Environment
```sh
sqs down

```

#### Testnet and Futurenet Nodes

- Start Testnet Node
```sh
sqs tn

```
- Start Testnet Node in Persistent Mode
```sh
 sqs tnp

```
- Start Futurenet  Node
```sh
sqs fn

```
- Start Futurenet  Node in Persistent Mode
```sh
sqs fnp

```

####  Run a Custom Docker Command

You can prepend sqs to execute custom Docker commands within the Stellar Quickstart environment. 

For example, to run a custom Docker command that maps port 8000 on your host to port 8000 inside the container, use:

```sh
sqs docker run -p 8000:8000 stellar/quickstart --local

```

This allows you to tailor your development environment with specific Docker configurations while leveraging the power of OmniLumen Quickstart.