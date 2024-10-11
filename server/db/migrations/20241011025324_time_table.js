/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('time', (table) => {
    table.increments('id').primary()
    table.date('date').notNullable()
    table.time('start_time').notNullable()
    table.time('end_time').notNullable()
    table.integer('task_id').unsigned().references('id').inTable('tasks')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('time')
}
