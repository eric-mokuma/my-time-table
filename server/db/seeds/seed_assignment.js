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
        TaskID: 1,
        TaskName: 'Task 1',
        Description: 'Description for task 1',
        Duration: '2 hours',
        IsPriority: true,
        IsCompleted: false,
      },
      {
        TaskID: 2,
        TaskName: 'Task 2',
        Description: 'Description for task 2',
        Duration: '1 hour',
        IsPriority: false,
        IsCompleted: false,
      },
      {
        TaskID: 3,
        TaskName: 'Task 3',
        Description: 'Description for task 3',
        Duration: '30 minutes',
        IsPriority: false,
        IsCompleted: true,
      },
    ])
    .onConflict('TaskID')
    .ignore()

  await knex('time_slots')
    .insert([
      {
        TimeSlotID: 1,
        StartTime: '09:00',
        EndTime: '10:00',
        Date: '2024-10-01',
      },
      {
        TimeSlotID: 2,
        StartTime: '10:00',
        EndTime: '11:00',
        Date: '2024-10-02',
      },
      {
        TimeSlotID: 3,
        StartTime: '11:00',
        EndTime: '12:00',
        Date: '2024-10-03',
      },
    ])
    .onConflict('TimeSlotID')
    .ignore()

  await knex('users')
    .insert([
      { UserID: 1, UserName: 'user1', Email: 'user1@example.com' },
      { UserID: 2, UserName: 'user2', Email: 'user2@example.com' },
      { UserID: 3, UserName: 'user3', Email: 'user3@example.com' },
    ])
    .onConflict('UserID')
    .ignore()

  await knex('assignments')
    .insert([
      { AssignmentID: 1, UserID: 1, TaskID: 1, TimeSlotID: 1 },
      { AssignmentID: 2, UserID: 2, TaskID: 2, TimeSlotID: 2 },
      { AssignmentID: 3, UserID: 3, TaskID: 3, TimeSlotID: 3 },
    ])
    .onConflict('AssignmentID')
    .ignore()
}
