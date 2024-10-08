/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  return knex('time_slots')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('time_slots').insert([
        { date: '2024-10-01', start_time: '09:00', end_time: '10:00' },
        { date: '2024-10-02', start_time: '10:00', end_time: '11:00' },
        { date: '2024-10-03', start_time: '11:00', end_time: '12:00' },
      ])
    })
}
