#!/bin/sh
# The `build` check: builds every demo as the Deploy workflow (.github/workflows/main.yml) does before it deploys to
# Firebase: in each directory with a package.json, install its dependencies and run its `build` script (Vite for
# most, rollup and postcss for the oldest), into that directory's dist/. The workflow ran `npm install`; this uses
# `npm ci`, which installs exactly what each directory's package-lock.json locks. Nothing is deployed and there are no
# tests: the point is that every demo still builds. Every directory is built, and the check fails at the end, naming
# each one that failed.
#
# yggdrasil.yml runs it in the pinned Node image from the repository's root. By hand, from anywhere in the checkout:
#   docker run --rm -v "$PWD:/src" -w /src <image> sh ci/build.sh
set -eu

# The repository's root, wherever this is run from.
cd "$(dirname "$0")/.."

failed=""
for dir in */; do
  dir=${dir%/}
  [ -f "$dir/package.json" ] || continue
  echo "==> $dir"
  if ! (cd "$dir" && npm ci --no-audit --no-fund && npm run build); then
    echo "ci/build.sh: $dir failed to build" >&2
    failed="$failed $dir"
  fi
done

if [ -n "$failed" ]; then
  echo "ci/build.sh: these demos failed to build:$failed" >&2
  exit 1
fi
