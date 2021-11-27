#!/usr/bin/env bash

sudo kill -9 $(ps -ef | grep buildApp | awk '{print $2}')

exit 0