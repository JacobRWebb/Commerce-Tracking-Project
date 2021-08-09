#!/bin/sh

ssh root@xodius.io <<EOF
  cd ~/Commerce-Tracker-Project
  git pull
  yarn setup
  pm2 start
EOF