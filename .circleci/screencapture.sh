#!/bin/bash

set -eo pipefail

COMMAND=${@: -1} # Gets the last argument (start/stop/trim)
OUTPUT_DIR="${HOME}/screencapture"
FILENAME="recording.mov"

# Terminal runs this command to start recording
if [ -z "${COMMAND}" ]; then
    osascript -e 'tell application "Terminal" to set miniaturized of every window to true'
    screencapture -v "${OUTPUT_DIR}/${FILENAME}"

# User calls start to begin recording
elif [[ "${COMMAND}" == start ]]; then
    mkdir -p "${OUTPUT_DIR}"
    open -a Terminal ~/dev/e2e-test-automation/.circleci/screencapture.sh
fi
