import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('conversations', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('model').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('conversations');
}
