#!/bin/sh
set -eu

DB_FILE="${DB_FILE:-/data/db.json}"
SEED_DB="${SEED_DB:-/seed/db.json}"
PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"

mkdir -p "$(dirname "$DB_FILE")"

if [ ! -f "$DB_FILE" ]; then
  echo "[api] Initializing db.json in volume: $DB_FILE"
  cp "$SEED_DB" "$DB_FILE"
else
  echo "[api] Using existing db.json from volume: $DB_FILE"
fi

# Start json-server-auth using the db.json from the volume
# REST endpoints + /login /register will work out-of-the-box.
 # Prefer local installation's binary so module resolution finds bundled deps
 if [ -x ./node_modules/.bin/json-server-auth ]; then
   exec ./node_modules/.bin/json-server-auth "$DB_FILE" --host "$HOST" --port "$PORT"
else
  exec json-server-auth "$DB_FILE" --host "$HOST" --port "$PORT"
fi
