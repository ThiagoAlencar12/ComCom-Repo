import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addFieldToUsersOnline1605528026305 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'online',
                type: 'boolean',
                default: false,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'online');
    }

}
