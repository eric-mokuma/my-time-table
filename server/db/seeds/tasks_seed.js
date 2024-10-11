/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          task_name: 'Complete project proposal',
          description: 'Write and review the project proposal document',
          duration: 120,
          is_priority: true,
          is_completed: false,
        },
        {
          task_name: 'Team meeting',
          description: 'Weekly team sync-up',
          duration: 60,
          is_priority: false,
          is_completed: false,
        },
        {
          task_name: 'Code review',
          description: 'Review pull requests from team members',
          duration: 90,
          is_priority: true,
          is_completed: false,
        },
      ])
    })
}
