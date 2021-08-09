#!/bin/sh

ssh -tt root@xodius.io <<-'ENDSSH'
  cd ~/Commerce-Tracking-Project
  git stash push --include-untracked
  git pull
  yarn setup
  exit
ENDSSH