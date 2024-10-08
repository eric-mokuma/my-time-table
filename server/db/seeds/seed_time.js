/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('time_slots').del()

  // Inserts seed entries
  await knex('time_slots').insert([
    { id: 1, start_time: '09:00', end_time: '10:00', date: '2024-10-01' },
    { id: 2, start_time: '10:00', end_time: '11:00', date: '2024-10-02' },
    { id: 3, start_time: '11:00', end_time: '12:00', date: '2024-10-03' },
  ])
}
