/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('assignments', (table) => {
    table.increments('AssignmentID').primary()
    table
      .integer('UserID')
      .unsigned()
      .references('UserID')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('TaskID')
      .unsigned()
      .references('TaskId')
      .inTable('tasks')
      .onDelete('CASCADE')
    table
      .integer('TimeSlotID')
      .unsigned()
      .references('TimeSlotID')
      .inTable('time_slots')
      .onDelete('CASCADE')
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('assignments')
}
