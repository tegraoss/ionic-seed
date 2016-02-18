#!/bin/bash

sudo /opt/android-sdk/platform-tools/adb kill-server
sudo /opt/android-sdk/platform-tools/adb start-server
sudo /opt/android-sdk/platform-tools/adb devices

