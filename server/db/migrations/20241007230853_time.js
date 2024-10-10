/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('time_slots', (table) => {
    table.increments('id').primary()
    table.timestamp('start_time').notNullable()
    table.timestamp('end_time').notNullable()
    table.date('date').notNullable()
    table.integer('task_id').unsigned().references('id').inTable('tasks')
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('time_slots')
}
