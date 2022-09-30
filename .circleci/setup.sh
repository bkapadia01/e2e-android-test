#!/bin/bash

set -eo pipefail

# Trash Build/Test Artifacts
rm -rf ~/trash || true
rm -rf ~/screencapture || true
mkdir -p ~/trash

# Kill All Test Applications & Erase Data
killall "Xcode" 2>/dev/null || true
killall "Terminal" 2>/dev/null || true
killall "Simulator" 2>/dev/null || true
killall "TouchBistroServer" 2>/dev/null || true
killall "Chrome" 2>/dev/null || true
osascript -e 'tell application "Finder" to close windows'

# Remove all previous sessions
rm -rf "$HOME/Library/Saved Application State/com.apple.Terminal.savedState"
rm -rf "$HOME/Library/Saved Application State/com.apple.iphonesimulator.savedState"
rm -rf "$HOME/Library/Saved Application State/com.google.Chrome.savedState"
xcrun simctl erase all
