/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('time_slots', (table) => {
    table.increments('id').primary()
    table.date('date').notNullable()
    table.time('start_time').notNullable()
    table.time('end_time').notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('time_slots')
}
