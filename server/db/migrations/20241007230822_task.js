/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary()
    table.string('task_name').notNullable()
    table.string('description')
    table.string('duration')
    table.boolean('is_priority').defaultTo(false)
    table.boolean('is_completed').defaultTo(false)
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('tasks')
}
