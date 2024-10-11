/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  return knex('time')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('time').insert([
        {
          date: '2023-06-01',
          start_time: '09:00:00',
          end_time: '11:00:00',
          task_id: 1,
        },
        {
          date: '2023-06-01',
          start_time: '14:00:00',
          end_time: '15:00:00',
          task_id: 2,
        },
        {
          date: '2023-06-02',
          start_time: '10:00:00',
          end_time: '11:30:00',
          task_id: 3,
        },
      ])
    })
}
