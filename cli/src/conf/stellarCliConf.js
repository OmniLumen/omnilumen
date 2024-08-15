export const stellarCommandStructure = {
    key: 'stellar',
    description: 'Build, deploy, & interact with contracts; set identities to sign with; configure networks; generate keys; and more.',
    commands: [
        {
            key: 'contract',
            description: 'Tools for smart contract developers',
            example: 'scli contract <subcommand>',
            commands: [
                {
                    key: 'asset',
                    description: 'Utilities to deploy a Stellar Asset Contract or get its id',
                    example: 'scli contract asset <subcommand>',
                    commands: [
                        { key: 'id', description: 'Get Id of builtin Soroban Asset Contract', example: 'scli contract asset id', commands: [] },
                        { key: 'deploy', description: 'Deploy builtin Soroban Asset Contract', example: 'scli contract asset deploy', commands: [] }
                    ]
                },
                {
                    key: 'bindings',
                    description: 'Generate code client bindings for a contract',
                    example: 'scli contract bindings <subcommand>',
                    commands: [
                        { key: 'json', description: 'Generate JSON bindings', example: 'scli contract bindings json', commands: [] },
                        { key: 'rust', description: 'Generate Rust bindings', example: 'scli contract bindings rust', commands: [] },
                        { key: 'typescript', description: 'Generate TypeScript bindings', example: 'scli contract bindings typescript', commands: [] }
                    ]
                },
                { key: 'build', description: 'Build a contract from source', example: 'scli contract build', commands: [] },
                { key: 'extend', description: 'Extend the time to live ledger of a contract-data ledger entry', example: 'scli contract extend', commands: [] },
                { key: 'deploy', description: 'Deploy a wasm contract', example: 'scli contract deploy', commands: [] },
                { key: 'fetch', description: 'Fetch a contract\'s Wasm binary', example: 'scli contract fetch', commands: [] },
                {
                    key: 'id',
                    description: 'Generate the contract id for a given contract or asset',
                    example: 'scli contract id <subcommand>',
                    commands: [
                        { key: 'asset', description: 'Deploy builtin Soroban Asset Contract', example: 'scli contract id asset', commands: [] },
                        { key: 'wasm', description: 'Deploy normal Wasm Contract', example: 'scli contract id wasm', commands: [] }
                    ]
                },
                { key: 'init', description: 'Initialize a Soroban project with an example contract', example: 'scli contract init', commands: [] },
                { key: 'inspect', description: 'Inspect a WASM file listing contract functions, meta, etc', example: 'scli contract inspect', commands: [] },
                { key: 'install', description: 'Install a WASM file to the ledger without creating a contract instance', example: 'scli contract install', commands: [] },
                { key: 'invoke', description: 'Invoke a contract function', example: 'scli contract invoke', commands: [] },
                { key: 'optimize', description: 'Optimize a WASM file', example: 'scli contract optimize', commands: [] },
                { key: 'read', description: 'Print the current value of a contract-data ledger entry', example: 'scli contract read', commands: [] },
                { key: 'restore', description: 'Restore an evicted value for a contract-data ledger entry', example: 'scli contract restore', commands: [] }
            ]
        },
        { key: 'completion', description: 'Print shell completion code for the specified shell', example: 'scli completion', commands: [] },
        { key: 'events', description: 'Watch the network for contract events', example: 'scli events', commands: [] },
        {
            key: 'keys',
            description: 'Create and manage identities including keys and addresses',
            example: 'scli keys <subcommand>',
            commands: [
                { key: 'add', description: 'Add a new identity (keypair, ledger, macOS keychain)', example: 'scli keys add', commands: [] },
                { key: 'address', description: 'Given an identity return its address (public key)', example: 'scli keys address', commands: [] },
                { key: 'fund', description: 'Fund an identity on a test network', example: 'scli keys fund', commands: [] },
                { key: 'generate', description: 'Generate a new identity with a seed phrase, currently 12 words', example: 'scli keys generate', commands: [] },
                { key: 'ls', description: 'List identities', example: 'scli keys ls', commands: [] },
                { key: 'rm', description: 'Remove an identity', example: 'scli keys rm', commands: [] },
                { key: 'show', description: 'Given an identity return its private key', example: 'scli keys show', commands: [] }
            ]
        },
        {
            key: 'xdr',
            description: 'Decode and encode XDR',
            example: 'scli xdr <subcommand>',
            commands: [
                {
                    key: 'types',
                    description: 'View information about types',
                    example: 'scli xdr types <subcommand>',
                    commands: [
                        { key: 'list', description: '', example: 'scli xdr types list', commands: [] },
                        { key: 'schema', description: '', example: 'scli xdr types schema', commands: [] }
                    ]
                },
                { key: 'guess', description: 'Guess the XDR type', example: 'scli xdr guess', commands: [] },
                { key: 'decode', description: 'Decode XDR', example: 'scli xdr decode', commands: [] },
                { key: 'encode', description: 'Encode XDR', example: 'scli xdr encode', commands: [] }
            ]
        },
        {
            key: 'network',
            description: 'Start and configure networks',
            example: 'scli network <subcommand>',
            commands: [
                { key: 'add', description: 'Add a new network', example: 'scli network add', commands: [] },
                { key: 'rm', description: 'Remove a network', example: 'scli network rm', commands: [] },
                { key: 'ls', description: 'List networks', example: 'scli network ls', commands: [] },
                { key: 'start', description: '⚠️ Deprecated: use `scli network container start` instead', example: 'scli network start', commands: [] },
                { key: 'stop', description: '⚠️ Deprecated: use `scli network container stop` instead', example: 'scli network stop', commands: [] },
                {
                    key: 'container',
                    description: 'Commands to start, stop and get logs for a quickstart container',
                    example: 'scli network container <subcommand>',
                    commands: [
                        { key: 'logs', description: 'Tail logs of a running network container', example: 'scli network container logs', commands: [] },
                        { key: 'start', description: 'Start network', example: 'scli network container start', commands: [] },
                        { key: 'stop', description: 'Stop a network started with `network container start`.', example: 'scli network container stop', commands: [] }
                    ]
                }
            ]
        },
        { key: 'version', description: 'Print version information', example: 'scli version', commands: [] },
        {
            key: 'tx',
            description: 'Sign, Simulate, and Send transactions',
            example: 'scli tx <subcommand>',
            commands: [
                { key: 'simulate', description: 'Simulate a transaction envelope from stdin', example: 'scli tx simulate', commands: [] }
            ]
        },
        {
            key: 'cache',
            description: 'Cache for transactions and contract specs',
            example: 'scli cache <subcommand>',
            commands: [
                { key: 'clean', description: 'Delete the cache', example: 'scli cache clean', commands: [] },
                { key: 'path', description: 'Show the location of the cache', example: 'scli cache path', commands: [] },
                {
                    key: 'actionlog',
                    description: 'Access details about cached actions like transactions, and simulations.',
                    example: 'scli cache actionlog <subcommand>',
                    commands: [
                        { key: 'ls', description: 'List cached actions (transactions, simulations)', example: 'scli cache actionlog ls', commands: [] },
                        { key: 'read', description: 'Read cached action', example: 'scli cache actionlog read', commands: [] }
                    ]
                }
            ]
        }
    ]
};