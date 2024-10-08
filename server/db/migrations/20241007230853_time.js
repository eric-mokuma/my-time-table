/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('time_slots', (table) => {
    table.increments('id').primary()
    table.string('start_time').notNullable()
    table.string('end_time').notNullable()
    table.string('date').notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('time_slots')
}
