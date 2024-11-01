import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHospitalTables1730390821117 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "hospitals",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "logo",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "location",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "address",
                        type: "json",
                        isNullable: false,
                    },
                    {
                        name: "billing_address",
                        type: "json",
                        isNullable: false,
                    },
                    {
                        name: "admins",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "gst",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "website",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "ratings",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "feedbacks",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "parent_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "documents",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "fastTag",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "departments",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "current",
                        type: "varchar",
                        isNullable: false,
                        default: "'pending'",
                    },
                    {
                        name: "isDisabled",
                        type: "boolean",
                        isNullable: false,
                        default: false,
                    },
                    {
                        name: "isDeactivated",
                        type: "boolean",
                        isNullable: false,
                        default: false,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("hospitals");
    }


}
