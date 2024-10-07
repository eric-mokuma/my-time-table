/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('time_slots').del()

  // Inserts seed entries
  await knex('time_slots').insert([
    { TimeSlotID: 1, StartTime: '09:00', EndTime: '10:00', Date: '2024-10-01' },
    { TimeSlotID: 2, StartTime: '10:00', EndTime: '11:00', Date: '2024-10-02' },
    { TimeSlotID: 3, StartTime: '11:00', EndTime: '12:00', Date: '2024-10-03' },
  ])
}
