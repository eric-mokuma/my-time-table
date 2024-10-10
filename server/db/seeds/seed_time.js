/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('time_slots').del()

  // Inserts seed entries
  await knex('time_slots').insert([
    {
      date: '2024-10-01',
      start_time: '2024-10-01 09:00:00',
      end_time: '2024-10-01 10:00:00',
    },
    {
      date: '2024-10-02',
      start_time: '2024-10-02 10:00:00',
      end_time: '2024-10-02 11:00:00',
    },
    {
      date: '2024-10-03',
      start_time: '2024-10-03 11:00:00',
      end_time: '2024-10-03 12:00:00',
    },
  ])
}
