export const stellarCommandStructure = {
    key: 'stellar',
    description: 'Build, deploy, & interact with contracts; set identities to sign with; configure networks; generate keys; and more.',
    commands: [
        {
            key: 'contract',
            description: 'Tools for smart contract developers',
            commands: [
                {
                    key: 'asset',
                    description: 'Utilities to deploy a Stellar Asset Contract or get its id',
                    commands: [
                        { key: 'id', description: 'Get Id of builtin Soroban Asset Contract', commands: [] },
                        { key: 'deploy', description: 'Deploy builtin Soroban Asset Contract', commands: [] }
                    ]
                },
                {
                    key: 'bindings',
                    description: 'Generate code client bindings for a contract',
                    commands: [
                        { key: 'json', description: 'Generate JSON bindings', commands: [] },
                        { key: 'rust', description: 'Generate Rust bindings', commands: [] },
                        { key: 'typescript', description: 'Generate TypeScript bindings', commands: [] }
                    ]
                },
                { key: 'build', description: 'Build a contract from source', commands: [] },
                { key: 'extend', description: 'Extend the time to live ledger of a contract-data ledger entry', commands: [] },
                { key: 'deploy', description: 'Deploy a wasm contract', commands: [] },
                { key: 'fetch', description: 'Fetch a contract\'s Wasm binary', commands: [] },
                {
                    key: 'id',
                    description: 'Generate the contract id for a given contract or asset',
                    commands: [
                        { key: 'asset', description: 'Deploy builtin Soroban Asset Contract', commands: [] },
                        { key: 'wasm', description: 'Deploy normal Wasm Contract', commands: [] }
                    ]
                },
                { key: 'init', description: 'Initialize a Soroban project with an example contract', commands: [] },
                { key: 'inspect', description: 'Inspect a WASM file listing contract functions, meta, etc', commands: [] },
                { key: 'install', description: 'Install a WASM file to the ledger without creating a contract instance', commands: [] },
                { key: 'invoke', description: 'Invoke a contract function', commands: [] },
                { key: 'optimize', description: 'Optimize a WASM file', commands: [] },
                { key: 'read', description: 'Print the current value of a contract-data ledger entry', commands: [] },
                { key: 'restore', description: 'Restore an evicted value for a contract-data ledger entry', commands: [] }
            ]
        },
        { key: 'completion', description: 'Print shell completion code for the specified shell', commands: [] },
        { key: 'events', description: 'Watch the network for contract events', commands: [] },
        {
            key: 'keys',
            description: 'Create and manage identities including keys and addresses',
            commands: [
                { key: 'add', description: 'Add a new identity (keypair, ledger, macOS keychain)', commands: [] },
                { key: 'address', description: 'Given an identity return its address (public key)', commands: [] },
                { key: 'fund', description: 'Fund an identity on a test network', commands: [] },
                { key: 'generate', description: 'Generate a new identity with a seed phrase, currently 12 words', commands: [] },
                { key: 'ls', description: 'List identities', commands: [] },
                { key: 'rm', description: 'Remove an identity', commands: [] },
                { key: 'show', description: 'Given an identity return its private key', commands: [] }
            ]
        },
        {
            key: 'xdr',
            description: 'Decode and encode XDR',
            commands: [
                {
                    key: 'types',
                    description: 'View information about types',
                    commands: [
                        { key: 'list', description: '', commands: [] },
                        { key: 'schema', description: '', commands: [] }
                    ]
                },
                { key: 'guess', description: 'Guess the XDR type', commands: [] },
                { key: 'decode', description: 'Decode XDR', commands: [] },
                { key: 'encode', description: 'Encode XDR', commands: [] }
            ]
        },
        {
            key: 'network',
            description: 'Start and configure networks',
            commands: [
                { key: 'add', description: 'Add a new network', commands: [] },
                { key: 'rm', description: 'Remove a network', commands: [] },
                { key: 'ls', description: 'List networks', commands: [] },
                { key: 'start', description: '⚠️ Deprecated: use `stellar container start` instead', commands: [] },
                { key: 'stop', description: '⚠️ Deprecated: use `stellar container stop` instead', commands: [] },
                {
                    key: 'container',
                    description: 'Commands to start, stop and get logs for a quickstart container',
                    commands: [
                        { key: 'logs', description: 'Tail logs of a running network container', commands: [] },
                        { key: 'start', description: 'Start network', commands: [] },
                        { key: 'stop', description: 'Stop a network started with `network container start`. For example, if you ran `network container start local`, you can use `network container stop local` to stop it', commands: [] }
                    ]
                }
            ]
        },
        { key: 'version', description: 'Print version information', commands: [] },
        {
            key: 'tx',
            description: 'Sign, Simulate, and Send transactions',
            commands: [
                { key: 'simulate', description: 'Simulate a transaction envelope from stdin', commands: [] }
            ]
        },
        {
            key: 'cache',
            description: 'Cache for transactions and contract specs',
            commands: [
                { key: 'clean', description: 'Delete the cache', commands: [] },
                { key: 'path', description: 'Show the location of the cache', commands: [] },
                {
                    key: 'actionlog',
                    description: 'Access details about cached actions like transactions, and simulations. (Experimental. May see breaking changes at any time.)',
                    commands: [
                        { key: 'ls', description: 'List cached actions (transactions, simulations)', commands: [] },
                        { key: 'read', description: 'Read cached action', commands: [] }
                    ]
                }
            ]
        }
    ]
};
