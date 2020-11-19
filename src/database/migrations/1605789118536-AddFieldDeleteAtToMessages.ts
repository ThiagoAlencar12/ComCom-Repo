import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddFieldDeleteAtToMessages1605789118536 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('messages', new TableColumn({
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('messages', 'deleted_at');
    }

}
