import express from "express"
import { ValidationError } from "objection"
import { Goal } from "../../../models/index.js"

const goalsRouter = new express.Router()

goalsRouter.get("/", async (req, res) => {
  try {
    const goals = await Goal.query()
    return res.status(200).json({ goals })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

goalsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const goal = await Goal.query().findById(id)
    return res.status(200).json({ goal })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

goalsRouter.post("/", async (req, res) => {
  const { userId, title, description } = req.body
  try {
    const newGoal = await Goal.query().insertAndFetch({ userId, title, description })
    return res.status(201).json({ goal: newGoal })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error.message })
  }
})

export default goalsRouter