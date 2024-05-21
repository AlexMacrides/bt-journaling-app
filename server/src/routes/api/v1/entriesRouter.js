import express from "express"
import { ValidationError } from "objection"
import { Entry } from "../../../models/index.js"

const entriesRouter = new express.Router()

entriesRouter.get("/", async (req, res) => {
  try {
    const entries = await Entry.query()
    return res.status(200).json({ entries })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

entriesRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const entry = await Entry.query().findById(id)
    return res.status(200).json({ entry })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

entriesRouter.post("/", async (req, res) => {
  const {
    userId, goalId, entryType, content,
    sleepQuality, gratitude,
    confidence, calm,
    focus, personalSatisfaction,
    productivity, physicalActivity
  } = req.body
  try {
    const newEntry = await Entry.query().insertAndFetch({
      userId, goalId, entryType, content,
      sleepQuality, gratitude,
      confidence, calm,
      focus, personalSatisfaction,
      productivity, physicalActivity
    })
    return res.status(201).json({ entry: newEntry })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error.message })
  }
})

export default entriesRouter