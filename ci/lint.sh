#!/bin/sh
# The `lint` check: installs the root's locked dev dependencies (eslint, nothing the demos use) and runs the root's
# `lint` script: eslint over every demo's scripts with the recommended rules (eslint.config.mjs says which are off,
# and why). Static checks only, nothing is built.
# yggdrasil.yml runs it in the pinned Node image (Alpine: no bash, so this is POSIX sh) from the repository's root.
# By hand, from anywhere in the checkout:
#   docker run --rm -v "$PWD:/src" -w /src <image> sh ci/lint.sh
set -eu

# The repository's root, wherever this is run from.
cd "$(dirname "$0")/.."

npm ci --no-audit --no-fund
npm run lint
