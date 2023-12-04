import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('conversations').del();

  // Inserts seed entries
  await knex('conversations').insert([
    {
      id: 1,
      name: 'New super conversation',
      model: 'gpt-4',
    },
  ]);
}
