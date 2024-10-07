/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    { UserID: 1, UserName: 'user1', Email: 'user1@example.com' },
    { UserID: 2, UserName: 'user2', Email: 'user2@example.com' },
    { UserID: 3, UserName: 'user3', Email: 'user3@example.com' },
  ])
}
