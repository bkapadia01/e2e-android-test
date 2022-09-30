#!/bin/bash

set -eo pipefail

OUTPUT_DIR="${HOME}/screencapture"
FILENAME="recording.mov"

if [[ "$1" == "store" ]]; then
    echo "Test failed. Saving Recording.."
    mkdir -p "$HOME/screencapture/"

    # The video is not be available right after screencapture ends.
    # It's likely an asynchronous process and takes even longer for large videos.
    # We'll loop for 3 minutes until mv succeeds.
    # If it takes longer than this, we should look into video processing using `avconvert`
    # We currently save the whole video since it's faster than cutting the video. 🤷‍♂️
    n=0
    until [ "$n" -ge 36 ]; do
        mv "${OUTPUT_DIR}/${FILENAME}" "${OUTPUT_DIR}/video.mov" && break
        echo "Recording not found.. Retrying after 5s"
        n=$((n+1))
        sleep 5
    done

    # Check if video has been moved
    if ls "${OUTPUT_DIR}/video.mov" > /dev/null 2>&1; then
        echo "Recording saved to $OUTPUT_DIR"
    else
        echo "Recording failed to save or too long to process."
    fi
else
    # Kill the screencapture script
    pkill -f "screencapture.sh"
fi
