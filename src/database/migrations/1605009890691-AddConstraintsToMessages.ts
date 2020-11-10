import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddConstraintsToMessages1605009890691 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'messages',
            new TableColumn({
                name: 'remetente_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.addColumn(
            'messages',
            new TableColumn({
                name: 'destinatario_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'messages',
            new TableForeignKey({
                name: 'RemetenteConstraint',
                columnNames: ['remetente_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'messages',
            new TableForeignKey({
                name: 'DestinatarioConstraint',
                columnNames: ['destinatario_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('messages', 'DestinatarioConstraint');
        
        await queryRunner.dropForeignKey('messages', 'RemetenteConstraint');

        await queryRunner.dropColumn('messages', 'destinatario_id');
        
        await queryRunner.dropColumn('messages', 'remetente_id');
    }
}
