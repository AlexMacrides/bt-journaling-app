import React, { useState } from "react"

const GoalForm = ({ onNewGoal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch("/api/v1/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        const newGoal = await response.json()
        onNewGoal(newGoal.goal)
        setFormData({
          title: "",
          description: ""
        })
      } else {
        console.error("Error creating goal")
      }
    } catch (error) {
      console.error("Error creating goal:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
      </label>
      <button type="submit">Create Goal</button>
    </form>
  )
}

export default GoalForm