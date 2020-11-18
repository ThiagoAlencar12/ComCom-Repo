import { MigrationInterface, QueryRunner , TableColumn, TableForeignKey } from "typeorm";

export class AddFieldAndConstraintsToEmails1605710606467 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'emails',
            new TableColumn({
                name: 'sender_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.addColumn(
            'emails',
            new TableColumn({
                name: 'reciever_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'emails',
            new TableForeignKey({
                name: 'SenderConstraint',
                columnNames: ['sender_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        )

        await queryRunner.createForeignKey(
            'emails',
            new TableForeignKey({
                name: 'RecieverConstraint',
                columnNames: ['reciever_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('emails', 'RecieverConstraint');
        
        await queryRunner.dropForeignKey('emails', 'SenderConstraint');

        await queryRunner.dropColumn('emails', 'reciever_email');
        
        await queryRunner.dropColumn('emails', 'sender_id');
    }

}
