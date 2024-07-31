#!/bin/bash

# Source the cargo environment variables
if [ -f $HOME/.cargo/env ]; then
  . $HOME/.cargo/env
  # Export the environment variables
  export PATH=$HOME/.cargo/bin:$PATH
  export CARGO_HOME=$HOME/.cargo
  export RUSTUP_HOME=$HOME/.rustup

  # Print the environment variables (optional, for debugging purposes)
  echo "PATH=$PATH"
  echo "CARGO_HOME=$CARGO_HOME"
  echo "RUSTUP_HOME=$RUSTUP_HOME"
fi