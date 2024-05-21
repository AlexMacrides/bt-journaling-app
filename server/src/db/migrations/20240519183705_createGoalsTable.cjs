/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const tableExists = await knex.schema.hasTable("goals")

  if (!tableExists) {
    return knex.schema.createTable("goals", (table) => {
      table.bigIncrements("id")
      table.bigInteger("userId").index().unsigned().notNullable().references("users.id")
      table.string("title").notNullable()
      table.string("description").notNullable()
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
      table.timestamp("updatedAt").notnullable().defaultTo(knex.fn.now())
    })
  }
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("goals")
};
