import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('messages').del();

  // Inserts seed entries
  await knex('messages').insert([
    {
      id: 1,
      role: 'assistant',
      message: "Hey, I'm helpful assistant!",
      source: 'seed',
      conversationId: 1,
    },
    {
      id: 2,
      role: 'user',
      message: 'Hey, how are you ?',
      source: 'seed',
      conversationId: 1,
    },
    {
      id: 3,
      role: 'assistant',
      message: 'Fine thx! You?',
      source: 'seed',
      conversationId: 1,
    },
  ]);
}
