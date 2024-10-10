/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary()
    table.string('task_name').notNullable()
    table.string('description')
    table.integer('duration').notNullable()
    table.boolean('is_priority').defaultTo(false)
    table.boolean('is_completed').defaultTo(false)
    table.integer('user_id').unsigned().references('id').inTable('users')
    table
      .integer('time_slot_id')
      .unsigned()
      .references('id')
      .inTable('time_slots')
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('tasks')
}
