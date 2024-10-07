/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()

  await knex('tasks').insert([
    {
      TaskId: 1,
      TaskName: 'Task 1',
      Description: 'Description for task 1',
      Duration: '2 hours',
      IsPriority: true,
      IsCompleted: false,
    },
    {
      TaskId: 2,
      TaskName: 'Task 2',
      Description: 'Description for task 2',
      Duration: '1 hour',
      IsPriority: false,
      IsCompleted: false,
    },
    {
      TaskId: 3,
      TaskName: 'Task 3',
      Description: 'Description for task 3',
      Duration: '30 minutes',
      IsPriority: false,
      IsCompleted: true,
    },
  ])
}
