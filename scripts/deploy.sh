#!/bin/sh

ssh -tt root@xodius.io <<EOF
  cd ~/Commerce-Tracking-Project
  git stash push --include-untracked
  git pull
  yarn setup
  echo DONE
EOF
>>
