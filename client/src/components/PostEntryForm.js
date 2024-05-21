import React, { useState } from "react"

const PostEventForm = ({ onNewEntry }) => {
  const [formData, setFormData] = useState({
    userId: 1,  // Assuming a logged in user with id 1 for simplicity
    entryType: "post-event",
    content: "",
    focus: "",
    personalSatisfaction: ""
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
      const response = await fetch("/api/v1/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        const newEntry = await response.json()
        onNewEntry(newEntry.entry)
        setFormData({
          content: "",
          focus: "",
          personalSatisfaction: ""
        })
      } else {
        console.error("Error creating entry")
      }
    } catch (error) {
      console.error("Error creating entry:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Content:
        <input type="text" name="content" value={formData.content} onChange={handleInputChange} />
      </label>
      <label>
        Focus:
        <input type="number" name="focus" value={formData.focus} onChange={handleInputChange} />
      </label>
      <label>
        Personal Satisfaction:
        <input type="number" name="personalSatisfaction" value={formData.personalSatisfaction} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit Post-Event Entry</button>
    </form>
  )
}

export default PostEventForm