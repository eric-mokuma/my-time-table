/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary()
    table.string('task_name').notNullable()
    table.text('description')
    table.integer('duration').notNullable()
    table.boolean('is_priority').defaultTo(false)
    table.boolean('is_completed').defaultTo(false)
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('tasks')
}
