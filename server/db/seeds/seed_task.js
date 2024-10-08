/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()

  await knex('tasks').insert([
    {
      id: 1,
      task_name: 'Task 1',
      description: 'Description for task 1',
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
}
