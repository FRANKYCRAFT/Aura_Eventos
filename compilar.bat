#!/bin/bash
# ─────────────────────────────────────────────────────────────────
# AURA EVENTOS API — Ejecución
# Variables opcionales (si tu MySQL no es root/root en localhost):
#   export AURA_DB_USER=aura_app
#   export AURA_DB_PASS=mi_contraseña
# ─────────────────────────────────────────────────────────────────
cd "$(dirname "$0")"
java -cp "out:lib/*" mx.aura.eventos.Main
