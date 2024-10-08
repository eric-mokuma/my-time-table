/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  return knex('tasks')
    .del()
    .then(function () {
      return knex('tasks').insert([
        {
          task_name: 'Task 1',
          description: 'Description for task 1',
          duration: '2 hours',
          id: 1,
          is_completed: false,
          is_priority: true,
        },
        {
          task_name: 'Task 2',
          description: 'Description for task 2',
          duration: '1 hour',
          id: 2,
          is_completed: false,
          is_priority: false,
        },
        {
          task_name: 'Task 3',
          description: 'Description for task 3',
          duration: '30 minutes',
          id: 3,
          is_completed: true,
          is_priority: false,
        },
      ])
    })
}
