/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('TaskId').primary()
    table.string('TaskName').notNullable()
    table.string('Description')
    table.string('Duration')
    table.boolean('IsPriority').defaultTo(false)
    table.boolean('IsCompleted').defaultTo(false)
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('tasks')
}
