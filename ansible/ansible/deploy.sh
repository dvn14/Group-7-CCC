#!/usr/bin/env bash

. ./openrc.sh; ansible-playbook -i hosts --ask-become-pass mrc.yml
