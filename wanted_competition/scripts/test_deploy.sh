#!/usr/bin/env bash

REPO=/home/ubuntu/social_ground_server
cd ${REPO}

ls

sudo nohup java -jar ./build/libs/buildApp.jar --spring.config.location=file:./property/application.yml --spring.profiles.active=test > nohup.out 2>&1 &