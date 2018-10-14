#!/bin/sh

cd ~/Library/Android/sdk/tools || exit

case $1 in
  -b | --boruno )
    ./emulator @phone -dns-server 8.8.4.4
    exit
    ;;
  * )
    ./emulator -avd Phone -dns-server 8.8.4.4
    exit
esac