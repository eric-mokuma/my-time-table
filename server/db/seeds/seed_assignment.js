/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('assignments').del()

  await knex('tasks')
    .insert([
      {
        id: 1,
        task_name: 'Task 1',
        description: 'd for task 1',
        duration: '2 hours',
        is_priority: true,
        is_completed: false,
      },
      {
        id: 2,
        task_name: 'Task 2',
        description: 'Description for task 2',
        duration: '1 hour',
        is_priority: false,
        is_completed: false,
      },
      {
        id: 3,
        task_name: 'Task 3',
        description: 'Description for task 3',
        duration: '30 minutes',
        is_priority: false,
        is_completed: true,
      },
    ])
    .onConflict('id')
    .ignore()

  await knex('time_slots')
    .insert([
      {
        id: 1,
        start_time: '09:00',
        end_time: '10:00',
        date: '2024-10-01',
      },
      {
        id: 2,
        start_time: '10:00',
        end_time: '11:00',
        date: '2024-10-02',
      },
      {
        id: 3,
        start_time: '11:00',
        end_time: '12:00',
        date: '2024-10-03',
      },
    ])
    .onConflict('id')
    .ignore()

  await knex('users')
    .insert([
      { id: 1, username: 'user1', email: 'user1@example.com' },
      { id: 2, username: 'user2', email: 'user2@example.com' },
      { id: 3, username: 'user3', email: 'user3@example.com' },
    ])
    .onConflict('id')
    .ignore()

  await knex('assignments')
    .insert([{ id: 1 }, { id: 2 }, { id: 3 }])
    .onConflict('id')
    .ignore()
}
