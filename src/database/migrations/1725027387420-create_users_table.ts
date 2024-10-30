import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1725027387420 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "first_name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "last_name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "user_type",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "phone",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            isNullable: false,
            default: "true",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "NOW()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "NOW()",
            onUpdate: "NOW()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
    );

    // Create enum type for user_type in PostgreSQL
    await queryRunner.query(`
      CREATE TYPE "user_type_enum" AS ENUM ('superAdmin', 'client', 'user', 'staff')
    `);

    // Alter the table to use the new enum type for user_type
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "user_type" TYPE "user_type_enum" USING "user_type"::"user_type_enum"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
    await queryRunner.query(`DROP TYPE "user_type_enum"`);
  }
}
