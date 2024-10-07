/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('time_slots', (table) => {
    table.increments('TimeSlotID').primary()
    table.string('StartTime').notNullable()
    table.string('EndTime').notNullable()
    table.string('Date').notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('time_slots')
}
