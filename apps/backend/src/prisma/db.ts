import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
// Hinweis: `with { type: 'json' }` entfernt, da das Backend mit
// `module: commonjs` gebaut wird (Nx + Webpack) – TS2823.
import contractJson from './contract.json';

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});
