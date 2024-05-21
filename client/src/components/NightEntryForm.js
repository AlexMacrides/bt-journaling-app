import React, { useState } from "react"

const NightForm = ({ onNewEntry }) => {
  const [formData, setFormData] = useState({
    userId: 1,  // Assuming a logged in user with id 1 for simplicity
    entryType: "night",
    content: "",
    productivity: "",
    physicalActivity: ""
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
          productivity: "",
          physicalActivity: ""
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
        Productivity:
        <input type="number" name="productivity" value={formData.productivity} onChange={handleInputChange} />
      </label>
      <label>
        Physical Activity:
        <input type="number" name="physicalActivity" value={formData.physicalActivity} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit Night Entry</button>
    </form>
  )
}

export default NightForm