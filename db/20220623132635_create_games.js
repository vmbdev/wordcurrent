/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'games';

export function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').unsigned().primary();
    table.string('key', 21).notNullable();
    table.string('language').notNullable();
    table.jsonb('wordset').notNullable();
    table.smallint('time').unsigned().notNullable();
    table.smallint('points').unsigned().notNullable();
    table.integer('timestamp').unsigned().notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable(tableName)
}
