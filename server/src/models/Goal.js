const { Model } = require("objection")

class Goal extends Model {
  static get tableName() {
    return "goals"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "title", "description"],
      properties: {
        userId: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string", minLength: 1, maxLength: 1000 }
      }
    }
  }

  static get relationMappings() {
    const { User } = require("./index")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "goals.userId",
          to: "users.id",
        }
      }
    }
  }
}

module.exports = Goal