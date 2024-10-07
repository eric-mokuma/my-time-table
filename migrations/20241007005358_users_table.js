/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('UserID').primary()
    table.string('UserName').notNullable()
    table.string('Email').notNullable().unique()
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('users')
}
