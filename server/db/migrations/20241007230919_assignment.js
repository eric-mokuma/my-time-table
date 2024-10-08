/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('assignments', (table) => {
    table.increments('id').primary()
    table
      .integer('id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('id')
      .unsigned()
      .references('id')
      .inTable('tasks')
      .onDelete('CASCADE')
    table
      .integer('id')
      .unsigned()
      .references('id')
      .inTable('time_slots')
      .onDelete('CASCADE')
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('assignments')
}
