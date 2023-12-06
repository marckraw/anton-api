import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('messages', (table) => {
    table.increments('id').primary();

    table.enum('role', ['assistant', 'user', 'system']).notNullable();
    table.string('message').notNullable();
    table.string('source').notNullable();
    table.integer('conversation_id').notNullable();

    table
      .foreign('conversation_id')
      .references('id')
      .inTable('conversations')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('messages');
}
