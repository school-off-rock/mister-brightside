#!/bin/sh

cd ~/Library/Android/sdk/tools || exit

case $1 in
  -b | --boruno )
    ./emulator @phone -dns-server 8.8.4.4
    exit
    ;;
  * )
    ./emulator -avd Nexus_5X_API_26 -dns-server 8.8.4.4
    exit
esac