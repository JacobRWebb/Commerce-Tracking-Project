#!/bin/sh

ssh -tt root@xodius.io <<EOF
  cd ~/Commerce-Tracking-Project
  git pull
  yarn setup
  pm2 start
EOF
>>
