#!/bin/sh

cd android || exit
./gradlew assembleRelease

while [ "$1" != "" ]; do
  case $1 in
    -v | --voice )  say -v Samantha "Build completed"
                    exit
                    ;;
    * )             exit
  esac
  shift
done
