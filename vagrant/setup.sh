#!/bin/bash

export JAVA_HOME="$(find /usr -type l -name 'default-java')"

cd /project

/usr/bin/bower install
/usr/bin/npm install

/usr/bin/gulp
/usr/bin/ionic state reset

./init.sh
