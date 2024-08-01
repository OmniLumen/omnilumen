#!/bin/bash

set -e

if ! command -v gcc &> /dev/null
then
    echo "gcc is not installed."

    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "Installing gcc on Linux..."
        sudo apt update
        sudo apt install -y build-essential
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "Installing gcc on macOS..."
        xcode-select --install
    else
        echo "Unsupported OS. Please install gcc manually."
        exit 1
    fi
else
    echo "gcc is already installed."
fi