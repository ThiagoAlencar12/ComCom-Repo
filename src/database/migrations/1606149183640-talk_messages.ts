import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class talkMessages1606149183640 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'talk_messages',
            columns: [
                {
                    name: 'talk_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'message_id',
                    type: 'uuid',
                    isNullable: true,
                }
            ]
        }));

        await queryRunner.createForeignKey('talk_messages', new TableForeignKey({
            name: 'TalkForeignKey',
            columnNames: ['talk_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'talk',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }));

        await queryRunner.createForeignKey('talk_messages', new TableForeignKey({
            name: 'messageForeignKey',
            columnNames: ['message_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'messages',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('talk_messages');
    }

}
