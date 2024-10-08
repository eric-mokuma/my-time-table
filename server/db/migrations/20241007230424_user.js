/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username').notNullable()
    table.string('email').notNullable().unique()
    table.string('created_at').defaultTo(knex.fn.now)
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('users')
}
