#!/bin/bash
set -e

echo "Deployment started ..."


# Make sure NVM is available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Pull the latest version of the app
git pull origin main
echo "New changes copied to server !"

# Installing Dependencies
echo "Installing Dependencies..."
npm install --yes

# Creating a build 
echo "Building application"
npm run build

# Copying dist to /var/www/chattrix
echo "Copying dist to /var/www/chattrix"
sudo cp -r dist/* /var/www/chattrix



echo "Deployment Finished!"
