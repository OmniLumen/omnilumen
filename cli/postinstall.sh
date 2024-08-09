#!/bin/bash

# Detect the operating system
OS=$(uname)

# Only run dos2unix if on a Unix-like system (Linux or macOS)
if [[ "$OS" == "Linux" || "$OS" == "Darwin" ]]; then
    echo "Detected $OS. Running post-installation script for Unix-like systems."

    # Check if dos2unix is installed, and install it if not
    if ! command -v dos2unix &> /dev/null
    then
        echo "dos2unix could not be found."

        if command -v sudo &> /dev/null; then
            echo "Attempting to install dos2unix using sudo..."

            # Install dos2unix based on the package manager available
            if [[ "$OS" == "Linux" ]]; then
                if command -v apt-get &> /dev/null; then
                    sudo apt-get update
                    sudo apt-get install -y dos2unix
                elif command -v yum &> /dev/null; then
                    sudo yum install -y dos2unix
                elif command -v dnf &> /dev/null; then
                    sudo dnf install -y dos2unix
                else
                    echo "No supported package manager found. Please install dos2unix manually."
                    exit 1
                fi
            elif [[ "$OS" == "Darwin" ]]; then
                if command -v brew &> /dev/null; then
                    brew install dos2unix
                else
                    echo "Homebrew is not installed. Please install Homebrew and then dos2unix manually."
                    exit 1
                fi
            fi
        else
            echo "sudo is not available. Please install dos2unix manually."
            exit 1
        fi
    fi

    # Convert line endings for the CLI script
    dos2unix ./bin/omnilumen-cli.js

else
    echo "Detected Windows or unsupported OS. Skipping dos2unix conversion."
fi