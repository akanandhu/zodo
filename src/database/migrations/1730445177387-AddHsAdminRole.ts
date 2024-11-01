import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHsAdminRole1730445177387 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE user_type_enum ADD VALUE IF NOT EXISTS 'hsAdmin';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Note: PostgreSQL does not support removing values from ENUM types directly.
        // This section is left intentionally blank or you can consider alternative approaches.
    }
}
