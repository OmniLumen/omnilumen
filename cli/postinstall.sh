#!/bin/bash

# Detect the operating system
OS=$(uname)

# Only run dos2unix if on a Unix-like system (Linux or macOS)
if [[ "$OS" == "Linux" || "$OS" == "Darwin" ]]; then
    echo "Detected $OS. Running post-installation script for Unix-like systems."

    # Check if dos2unix is installed, and install it if not
    if ! command -v dos2unix &> /dev/null
    then
        echo "dos2unix could not be found, installing..."
        sudo apt-get update
        sudo apt-get install -y dos2unix
    fi

    # Convert line endings for the CLI script
    dos2unix ./bin/omnilumen-cli.js

else
    echo "Detected Windows or unsupported OS. Skipping dos2unix conversion."
fi