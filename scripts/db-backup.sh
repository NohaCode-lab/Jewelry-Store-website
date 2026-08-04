#!/bin/bash
# -------------------------------------------------------------
# Mangata & Gallo Automated PostgreSQL Database Backup Script
# -------------------------------------------------------------
set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
CONTAINER_NAME="mangata-postgres"
DB_USER="postgres"
DB_NAME="mangatagallo_prod"
BACKUP_FILE="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql.gz"

mkdir -p ${BACKUP_DIR}

echo "📦 Creating compressed PostgreSQL database dump..."
docker exec ${CONTAINER_NAME} pg_dump -U ${DB_USER} -d ${DB_NAME} | gzip > ${BACKUP_FILE}

echo "✅ Backup created successfully: ${BACKUP_FILE}"
echo "🧹 Cleaning up backups older than 30 days..."
find ${BACKUP_DIR} -name "db_backup_*.sql.gz" -mtime +30 -exec rm {} \;
echo "✨ Backup automation process finished."
