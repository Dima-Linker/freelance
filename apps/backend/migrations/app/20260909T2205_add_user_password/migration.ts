#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/7f5a04fd15675e28a6c4d13ff8aea3dcb23d1a9c33634f0d46a9e01fa9bfaa70/contract';
import startContract from '../../snapshots/7f5a04fd15675e28a6c4d13ff8aea3dcb23d1a9c33634f0d46a9e01fa9bfaa70/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d7e13dc80336a28b8b94d41d413096b16da849af979b2d98aa9eb6cec427db1c/contract';
import endContract from '../../snapshots/d7e13dc80336a28b8b94d41d413096b16da849af979b2d98aa9eb6cec427db1c/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  primaryKey,
  rawSql,
} from '@internal/postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'job',
        columns: [
          col('budgetMax', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('budgetMin', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('clientId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('remote', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('workYears', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'jobTechnology',
        columns: [
          col('jobId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('technologyId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'technology',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('password', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      // Backfill für die neue NOT NULL-Spalte "user.password".
      // Es gibt KEIN echtes Benutzerpasswort und KEINEN Klartext: Der Übergangswert
      // ist ein kryptographisch zufälliger 64-Hex-String (kein bekanntes Passwort),
      // mit dem kein Login möglich ist. Bestehende User-Daten bleiben unverändert
      // erhalten; betroffen sind ausschließlich Zeilen mit NULL-Passwort (aktuell 0).
      rawSql({
        id: 'data_migration.backfill-user-password',
        label: 'Data transform: backfill-user-password',
        operationClass: 'data',
        target: { id: 'postgres' },
        precheck: [
          {
            description: 'Check backfill-user-password has work to do',
            sql: 'SELECT EXISTS (SELECT 1 FROM "public"."user" WHERE "password" IS NULL) AS ok',
            params: [],
          },
        ],
        execute: [
          {
            description: 'Run backfill-user-password',
            sql: 'UPDATE "public"."user" SET "password" = \'7743959886b6213adf5b903d84534f08deb079a22bbb06dd6148abaed2d782ec\' WHERE "password" IS NULL',
            params: [],
          },
        ],
        postcheck: [
          {
            description: 'Verify backfill-user-password resolved all violations',
            sql: 'SELECT NOT EXISTS (SELECT 1 FROM "public"."user" WHERE "password" IS NULL) AS ok',
            params: [],
          },
        ],
      }),
      this.setNotNull({ schema: 'public', table: 'user', column: 'password' }),
      this.addUnique({
        schema: 'public',
        table: 'technology',
        constraint: 'technology_title_key',
        columns: ['title'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'job',
        index: 'job_clientId_idx_153a9a49',
        columns: ['clientId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobTechnology',
        index: 'jobTechnology_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'jobTechnology',
        index: 'jobTechnology_technologyId_idx_1e2af707',
        columns: ['technologyId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'job',
        foreignKey: {
          name: 'job_clientId_fkey',
          columns: ['clientId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobTechnology',
        foreignKey: {
          name: 'jobTechnology_jobId_fkey',
          columns: ['jobId'],
          references: { schema: 'public', table: 'job', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'jobTechnology',
        foreignKey: {
          name: 'jobTechnology_technologyId_fkey',
          columns: ['technologyId'],
          references: { schema: 'public', table: 'technology', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
