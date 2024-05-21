const { Model } = require("objection")

class Entry extends Model {
  static get tableName() {
    return "entries"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "entryType"],
      properties: {
        userId: { type: "integer" },
        entryType: { type: "string", enum: ["morning", "pre-event", "post-event", "night"] },
        sleepQuality: { type: ["integer", "null"], minimum: 1, maximum: 10 },
        gratitude: { type: ["string", "null"], maxLength: 255 },
        confidence: { type: ["integer", "null"], minimum: 1, maximum: 10 },
        calm: { type: ["integer", "null"], minimum: 1, maximum: 10 },
        focus: { type: ["integer", "null"], minimum: 1, maximum: 10 },
        personalSatisfaction: { type: ["integer", "null"], minimum: 1, maximum: 10 },
        productivity: { type: ["integer", "null"], minimum: 1, maximum: 10 },
        physicalActivity: { type: ["integer", "null"], minimum: 1, maximum: 10 },
        content: { type: ["string", "null"] }
      }
    }
  }

  static get relationMappings() {
    const User = require("./User")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "entries.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Entry