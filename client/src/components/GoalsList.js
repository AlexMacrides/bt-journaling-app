import React, { useState, useEffect } from "react"
import GoalForm from "./GoalForm"

const GoalsList = () => {
  const [goals, setGoals] = useState([])

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/v1/goals")
      if (response.ok) {
        const fetchedGoals = await response.json()
        setGoals(fetchedGoals.goals)
      }
    } catch (error) {
      console.error("Error fetching goals:", error)
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [])

  const handleNewGoal = (goal) => {
    setGoals([...goals, goal])
  }

  return (
    <div>
      <h1>Goals</h1>
      <GoalForm onNewGoal={handleNewGoal} />
      <ul>
        {goals.map(goal => (
          <li key={goal.id}>
            <h2>{goal.title}</h2>
            <p>{goal.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GoalsList