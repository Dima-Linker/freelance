import baseConfig from "../../eslint.config.mjs";

export default [
    // Generierte Prisma-Migrationen, -Snapshots und Contract nicht linten
    { ignores: ['migrations/**', 'src/prisma/contract.*'] },
    ...baseConfig
];
