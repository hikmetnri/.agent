#!/bin/zsh
cd /Users/hikmet/Desktop/Proje || exit 1
echo "Started at $(date)"
node .agent/content/downloadWikimediaIsgSigns.js \
  --start=25 \
  --limit=26 \
  --delay-ms=60000 \
  --retry-count=120 \
  --retry-delay-ms=300000
echo "Finished at $(date)"
