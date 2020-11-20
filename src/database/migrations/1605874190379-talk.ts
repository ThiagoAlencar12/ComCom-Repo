import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class talk1605874190379 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'talk',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                }, 
                {
                    name: 'user_primary',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'user_secundary',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ]
        }));

        await queryRunner.createForeignKey(
            'talk',
            new TableForeignKey({
                name: 'UserConstraintPrimary',
                columnNames: ['user_primary'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'talk',
            new TableForeignKey({
                name: 'UserConstraintSecundary',
                columnNames: ['user_secundary'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('talk');
    }

}
