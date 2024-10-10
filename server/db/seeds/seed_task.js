/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()

  // Inserts seed entries
  await knex('tasks').insert([
    {
      task_name: 'Task 1',
      description: 'Description for task 1',
      duration: 120,
      is_completed: false,
      is_priority: true,
    },
    {
      task_name: 'Task 2',
      description: 'Description for task 2',
      duration: 60,
      is_completed: false,
      is_priority: false,
    },
    {
      task_name: 'Task 3',
      description: 'Description for task 3',
      duration: 30,
      is_completed: true,
      is_priority: false,
    },
  ])
}
