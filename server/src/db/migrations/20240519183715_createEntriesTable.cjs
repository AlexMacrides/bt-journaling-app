/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const tableExists = await knex.schema.hasTable("entries")

  if (!tableExists) {
    return knex.schema.createTable("entries", (table) => {
      table.bigIncrements("id")
      table.bigInteger("userId").references("id").inTable("users").notNullable()
      table.enum("entryType", ["morning", "pre-event", "post-event", "night"]).notNullable()
      table.integer("sleepQuality").unsigned().defaultTo(null) // Morning
      table.string("gratitude").defaultTo(null) // Morning
      table.integer("confidence").unsigned().defaultTo(null) // Pre-event
      table.integer("calm").unsigned().defaultTo(null) // Pre-event
      table.integer("focus").unsigned().defaultTo(null) // Post-event
      table.integer("personalSatisfaction").unsigned().defaultTo(null) // Post-event
      table.integer("productivity").unsigned().defaultTo(null) // Night
      table.integer("physicalActivity").unsigned().defaultTo(null) // Night
      table.text("content").defaultTo(null) // for all forms
      table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable()
      table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable()
    })
  }
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("entries")
}