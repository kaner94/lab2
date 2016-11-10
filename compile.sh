#!/bin/bash

echo "BEGINNING INSTALLATION OF NODE\n\n"

curl -sL https://deb.nodesource.com/setup_7.x | bash -
apt-get install -y nodejs

npm install ip
