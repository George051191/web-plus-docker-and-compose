"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'kupipodariday',
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: [],
    synchronize: true,
});
exports.AppDataSource.initialize();
//# sourceMappingURL=ormconfig.js.map